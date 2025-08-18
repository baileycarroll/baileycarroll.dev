import { NextRequest, NextResponse } from 'next/server';
import { projectService, disconnectDatabase } from '@/services';

export async function GET() {
  try {
    const result = await projectService.getAllProjects();
    
    if (result.success) {
      return NextResponse.json(result.data);
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  } finally {
    await disconnectDatabase();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectData, skillIds, categories } = body;

    const result = await projectService.createProject(projectData, skillIds, categories);
    
    if (result.success) {
      return NextResponse.json(result.data, { status: 201 });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  } finally {
    await disconnectDatabase();
  }
}
