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

    const modules = await prisma.module.findMany({
      include: { class: true },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(modules);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch modules' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, fileUrl, classId } = body;

    const mod = await prisma.module.create({
      data: {
        title,
        content,
        fileUrl,
        classId,
      },
    });

    return NextResponse.json(mod, { status: 201 });
  } catch (error) {
    console.error('Create module error:', error);
    return NextResponse.json({ error: 'Failed to create module' }, { status: 500 });
  }
}
