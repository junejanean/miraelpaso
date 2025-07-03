import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";

// Create a new Prisma client instance
const prisma = new PrismaClient();

// Make sure Prisma client is properly connected
prisma.$connect().then(() => {
  console.log('Prisma connected successfully');
}).catch((e: Error) => {
  console.error('Prisma connection error:', e);
});

// Use the standard PrismaAdapter with enhanced logging
const prismaAdapter = PrismaAdapter(prisma);

// Add logging to track authentication flow
const loggerMiddleware = {
  async createUser(data: any) {
    console.log('Creating user from OAuth:', data);
    try {
      const user = await prismaAdapter.createUser!(data);
      console.log('User created successfully:', user.id);
      return user;
    } catch (error) {
      console.error('Error creating user from OAuth:', error);
      throw error;
    }
  },
  async getUserByAccount(providerAccountId: { provider: string; providerAccountId: string }) {
    console.log('Getting user by account:', providerAccountId);
    try {
      const user = await prismaAdapter.getUserByAccount!(providerAccountId);
      console.log('User found by account:', user ? user.id : 'No user found');
      return user;
    } catch (error) {
      console.error('Error getting user by account:', error);
      return null;
    }
  },
  async linkAccount(data: any) {
    console.log('Linking account:', data);
    try {
      await prismaAdapter.linkAccount!(data);
      console.log('Account linked successfully');
    } catch (error) {
      console.error('Error linking account:', error);
      throw error;
    }
  }
};

// Combine the standard adapter with our logging middleware
const customAdapter = {
  ...prismaAdapter,
  ...loggerMiddleware
};

// This is your NextAuth configuration
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user.hashedPassword) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          isBusinessOwner: user.isBusinessOwner,
          isVerified: user.isVerified
        };
      }
    })
  ],
  adapter: customAdapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // @ts-ignore - these properties exist on our user object
        token.isBusinessOwner = user.isBusinessOwner || false;
        // @ts-ignore - these properties exist on our user object
        token.isVerified = user.isVerified || true;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.isBusinessOwner = token.isBusinessOwner as boolean;
        session.user.isVerified = token.isVerified as boolean;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Handle redirects properly
      console.log('Redirect callback called with:', { url, baseUrl });
      
      // If the url is relative or is the same origin as the baseUrl
      if (url.startsWith('/') || url.startsWith(baseUrl)) {
        console.log('Redirecting to:', url);
        return url;
      }
      
      // Default to homepage
      console.log('Redirecting to baseUrl:', baseUrl);
      return baseUrl;
    },
  },
  events: {
    async createUser({ user }) {
      // When a user is created via social login, update their properties
      if (!user.email) return;
      
      try {
        console.log('User created event triggered for:', user);
        await prisma.user.update({
          where: { id: user.id },
          data: {
            isBusinessOwner: false,
            isVerified: true
          }
        });
        console.log('User updated successfully with business owner and verification flags');
      } catch (error) {
        console.error('Error updating new user:', error);
      }
    },
    async signIn({ user, account, profile }) {
      console.log('Sign in event triggered:', { 
        userId: user.id, 
        provider: account?.provider,
        email: user.email
      });
      // Don't return anything to avoid type errors
    },
    async linkAccount({ user, account }) {
      console.log('Link account event triggered:', { 
        userId: user.id, 
        provider: account.provider,
        providerAccountId: account.providerAccountId 
      });
      // This event handler doesn't need to return anything
    },
  },
  debug: true,
  logger: {
    error(code, metadata) {
      console.error('NEXTAUTH_ERROR', { code, metadata });
    },
    warn(code) {
      console.warn('NEXTAUTH_WARNING', code);
    },
    debug(code, metadata) {
      console.log('NEXTAUTH_DEBUG', { code, metadata });
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
