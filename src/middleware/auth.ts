import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from 'firebase-admin';
import { getApp, initializeApp, cert } from 'firebase-admin/app';

// Initialize Firebase Admin if it hasn't been initialized
const initAdmin = () => {
  try {
    return getApp();
  } catch {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}'
    );
    return initializeApp({
      credential: cert(serviceAccount)
    });
  }
};

export async function validateAuth(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];
    if (!token) {
      return false;
    }

    initAdmin();
    await auth().verifyIdToken(token);
    return true;
  } catch (error) {
    console.error('Auth error:', error);
    return false;
  }
}

export async function authMiddleware(
  request: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  const isAuthenticated = await validateAuth(request);
  
  if (!isAuthenticated) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return handler(request);
}
