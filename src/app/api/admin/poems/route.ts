import { NextRequest, NextResponse } from 'next/server';
import { poemService } from '@/services';

export async function GET() {
  try {
    console.log('Fetching poems...');
    const result = await poemService.getAllPoems();
    console.log('Poems result:', result);
    
    if (result.success) {
      return NextResponse.json(result.data);
    } else {
      console.error('Poem service error:', result.error);
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error fetching poems:', error);
    return NextResponse.json(
      { error: 'Failed to fetch poems' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { poemData, tags, categories } = body;

    const result = await poemService.createPoem(poemData, tags, categories);
    
    if (result.success) {
      return NextResponse.json(result.data, { status: 201 });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating poem:', error);
    return NextResponse.json(
      { error: 'Failed to create poem' },
      { status: 500 }
    );
  }
}
