import { NextRequest, NextResponse } from 'next/server';
import { articleService, disconnectDatabase } from '@/services';

export async function GET() {
  try {
    const result = await articleService.getAllArticles();
    
    if (result.success) {
      return NextResponse.json(result.data);
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  } finally {
    await disconnectDatabase();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { articleData, tags, categories } = body;

    const result = await articleService.createArticle(articleData, tags, categories);
    
    if (result.success) {
      return NextResponse.json(result.data, { status: 201 });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  } finally {
    await disconnectDatabase();
  }
}
