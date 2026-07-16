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

    const attendances = await prisma.attendance.findMany({
      include: {
        class: true,
        records: {
          include: { student: true }
        }
      },
      orderBy: { date: 'desc' },
    });
    
    return NextResponse.json(attendances);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch attendances' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userRole = (session.user as any).role;
    const body = await request.json();

    if (userRole === 'TEACHER') {
      // Teacher opens an attendance session
      const { classId } = body;
      const attendance = await prisma.attendance.create({
        data: {
          classId,
          isOpen: true,
        },
      });
      return NextResponse.json(attendance, { status: 201 });
    } else if (userRole === 'STUDENT') {
      // Student marks presence
      const { attendanceId } = body;
      const studentId = (session.user as any).id;
      
      const record = await prisma.attendanceRecord.create({
        data: {
          attendanceId,
          studentId,
          status: 'PRESENT',
        },
      });
      return NextResponse.json(record, { status: 201 });
    }

    return NextResponse.json({ error: 'Invalid role action' }, { status: 400 });
  } catch (error) {
    console.error('Create attendance error:', error);
    return NextResponse.json({ error: 'Failed to create attendance' }, { status: 500 });
  }
}
