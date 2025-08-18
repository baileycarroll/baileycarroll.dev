import { NextRequest, NextResponse } from 'next/server';
import { skillService } from '@/services';

export async function GET() {
  try {
    const result = await skillService.getAllSkillCategories();
    
    if (result.success) {
      return NextResponse.json(result.data);
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error fetching skill categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skill categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { categoryData } = body;

    const result = await skillService.createSkillCategory(categoryData);
    
    if (result.success) {
      return NextResponse.json(result.data, { status: 201 });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating skill category:', error);
    return NextResponse.json(
      { error: 'Failed to create skill category' },
      { status: 500 }
    );
  }
}
