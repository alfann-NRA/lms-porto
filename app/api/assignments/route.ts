import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const assignments = await prisma.assignment.findMany({
      include: {
        class: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(assignments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch assignments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, dueDate } = body;

    // Ensure a default class exists for this teacher
    let defaultClass = await prisma.class.findFirst({
      where: { teacherId: (session.user as any).id },
    });

    if (!defaultClass) {
      defaultClass = await prisma.class.create({
        data: {
          name: 'Kelas Default',
          description: 'Kelas otomatis',
          teacherId: (session.user as any).id,
        },
      });
    }

    const assignment = await prisma.assignment.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        classId: defaultClass.id,
      },
    });

    return NextResponse.json(assignment, { status: 201 });
  } catch (error) {
    console.error('Create assignment error:', error);
    return NextResponse.json({ error: 'Failed to create assignment' }, { status: 500 });
  }
}
