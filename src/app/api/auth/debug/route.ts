import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// This endpoint will help debug authentication issues
export async function GET(request: NextRequest) {
  try {
    // Check database connection
    await prisma.$connect();
    
    // Get current session if any
    const session = await getServerSession();
    
    // Check if Google OAuth credentials are configured
    const googleConfigured = process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET;
    
    // Check if NextAuth secret is configured
    const secretConfigured = !!process.env.NEXTAUTH_SECRET;
    
    // Check if we can query users
    let userCount = 0;
    let accountCount = 0;
    try {
      userCount = await prisma.user.count();
      accountCount = await prisma.account.count();
    } catch (error) {
      console.error('Error querying database:', error);
    }
    
    return NextResponse.json({
      status: 'ok',
      databaseConnected: true,
      session: session ? {
        user: {
          ...session.user,
          // Don't expose sensitive data
          email: session.user?.email ? `${session.user.email.substring(0, 3)}...` : null
        }
      } : null,
      authConfig: {
        googleConfigured,
        secretConfigured,
        callbackUrl: `${request.nextUrl.origin}/api/auth/callback/google`,
      },
      database: {
        userCount,
        accountCount
      }
    });
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to debug auth',
      error: (error as Error).message
    }, { status: 500 });
  }
}
