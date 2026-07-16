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

    const discussions = await prisma.discussion.findMany({
      include: {
        class: true,
        comments: {
          include: { user: true },
          orderBy: { createdAt: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(discussions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch discussions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, title, content, classId, discussionId } = body;
    const userId = (session.user as any).id;

    if (action === 'CREATE_DISCUSSION') {
      const discussion = await prisma.discussion.create({
        data: {
          title,
          content,
          classId,
        },
      });
      return NextResponse.json(discussion, { status: 201 });
    } else if (action === 'ADD_COMMENT') {
      const comment = await prisma.comment.create({
        data: {
          content,
          discussionId,
          userId,
        },
      });
      return NextResponse.json(comment, { status: 201 });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Create discussion error:', error);
    return NextResponse.json({ error: 'Failed to create discussion/comment' }, { status: 500 });
  }
}
