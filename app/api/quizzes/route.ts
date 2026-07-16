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

    const quizzes = await prisma.quiz.findMany({
      include: { 
        class: true,
        questions: true, 
      },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(quizzes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch quizzes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const role = (session.user as any).role;
    const body = await request.json();

    if (role === 'TEACHER') {
      // Create new quiz
      const { title, durationMin, classId, questions } = body;
      const quiz = await prisma.quiz.create({
        data: {
          title,
          durationMin,
          classId,
          questions: {
            create: questions // array of { text, optionA, optionB, optionC, optionD, correctOpt }
          }
        },
      });
      return NextResponse.json(quiz, { status: 201 });
    } else if (role === 'STUDENT') {
      // Submit quiz attempt
      const { quizId, score } = body;
      const studentId = (session.user as any).id;
      const attempt = await prisma.quizAttempt.create({
        data: {
          quizId,
          studentId,
          score,
        },
      });
      return NextResponse.json(attempt, { status: 201 });
    }

    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  } catch (error) {
    console.error('Quiz POST error:', error);
    return NextResponse.json({ error: 'Failed to process quiz action' }, { status: 500 });
  }
}
