import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const virtualClasses = await prisma.virtualClass.findMany({
      include: { class: true },
      orderBy: { startTime: 'asc' },
    });
    
    return NextResponse.json(virtualClasses);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch virtual classes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, platform, meetingLink, startTime, classId } = body;

    const vclass = await prisma.virtualClass.create({
      data: {
        title,
        platform,
        meetingLink,
        startTime: new Date(startTime),
        classId,
      },
    });

    return NextResponse.json(vclass, { status: 201 });
  } catch (error) {
    console.error('Create virtual class error:', error);
    return NextResponse.json({ error: 'Failed to create virtual class' }, { status: 500 });
  }
}
