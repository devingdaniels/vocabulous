import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/auth';

async function handler(request: NextRequest) {
  return NextResponse.json({ message: 'This is a protected endpoint' });
}

export async function GET(request: NextRequest) {
  return authMiddleware(request, handler);
}

export async function POST(request: NextRequest) {
  return authMiddleware(request, handler);
}
