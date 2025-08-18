import { NextRequest, NextResponse } from 'next/server';
import { poemService, disconnectDatabase } from '@/services';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await poemService.getPoemById(params.id);
    
    if (result.success) {
      return NextResponse.json(result.data);
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error fetching poem:', error);
    return NextResponse.json(
      { error: 'Failed to fetch poem' },
      { status: 500 }
    );
  } finally {
    await disconnectDatabase();
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { poemData, tags, categories } = body;

    const result = await poemService.updatePoem(params.id, poemData, tags, categories);
    
    if (result.success) {
      return NextResponse.json(result.data);
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating poem:', error);
    return NextResponse.json(
      { error: 'Failed to update poem' },
      { status: 500 }
    );
  } finally {
    await disconnectDatabase();
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await poemService.deletePoem(params.id);
    
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error deleting poem:', error);
    return NextResponse.json(
      { error: 'Failed to delete poem' },
      { status: 500 }
    );
  } finally {
    await disconnectDatabase();
  }
}
