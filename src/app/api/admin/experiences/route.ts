import { NextRequest, NextResponse } from 'next/server';
import { experienceService } from '@/services/database';
import { disconnectDatabase } from '@/lib/database';

export async function GET() {
  try {
    const result = await experienceService.getAllExperiences();
    
    if (result.success) {
      return NextResponse.json(result.data);
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    );
  } finally {
    await disconnectDatabase();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { experienceData, skillIds } = body;

    const result = await experienceService.createExperience(experienceData, skillIds);
    
    if (result.success) {
      return NextResponse.json(result.data, { status: 201 });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error creating experience:', error);
    return NextResponse.json(
      { error: 'Failed to create experience' },
      { status: 500 }
    );
  } finally {
    await disconnectDatabase();
  }
}
