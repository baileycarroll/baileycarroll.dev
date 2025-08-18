import { NextRequest, NextResponse } from 'next/server';
import { poemService, disconnectDatabase } from '@/services';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const result = await poemService.getPoemById(id);
    
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
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { poemData, tags, categories } = body;

    const result = await poemService.updatePoem(id, poemData, tags, categories);
    
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
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const result = await poemService.deletePoem(id);
    
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
