import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'STUDENT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const studentId = (session.user as any).id;
    
    // Get all assignments
    const assignments = await prisma.assignment.findMany({
      include: { class: true },
      orderBy: { createdAt: 'desc' }
    });

    // Get submissions for this student
    const submissions = await prisma.submission.findMany({
      where: { studentId },
    });

    // Map submissions by assignmentId
    const submissionMap = new Map();
    for (const sub of submissions) {
      submissionMap.set(sub.assignmentId, sub);
    }

    // Prepare Kanban items
    const tasks = assignments.map(a => {
      const sub = submissionMap.get(a.id);
      return {
        id: sub ? sub.id : `new-${a.id}`, // use new- prefix for unsubmitted
        assignmentId: a.id,
        content: a.title,
        course: a.class.name,
        status: sub ? sub.status : 'TODO',
      };
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Fetch tasks error:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'STUDENT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { taskId, assignmentId, status } = body;
    const studentId = (session.user as any).id;

    if (taskId.startsWith('new-')) {
      // Create new submission
      const newSub = await prisma.submission.create({
        data: {
          studentId,
          assignmentId,
          status,
        }
      });
      return NextResponse.json(newSub);
    } else {
      // Update existing
      const updated = await prisma.submission.update({
        where: { id: taskId, studentId },
        data: { status },
      });
      return NextResponse.json(updated);
    }
  } catch (error) {
    console.error('Update submission error:', error);
    return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 });
  }
}
