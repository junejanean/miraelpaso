# Mira El Paso

Mira El Paso is a modern events application for discovering and exploring local events in El Paso, Texas. Built with Next.js 14, TypeScript, and Tailwind CSS, this app helps users connect with their community and discover what's happening around them.

This project is built with [Next.js](https://nextjs.org) and bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- **Event Discovery**: Browse and search for events by category, date, or location
- **User Authentication**: Create an account, log in, and manage your profile
- **Personalized Experience**: Save favorite events and get personalized recommendations
- **Event Creation**: Business owners can create and manage their events
- **Responsive Design**: Optimized for both desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS, Shadcn UI
- **Authentication**: NextAuth.js with credentials provider
- **Database**: Prisma ORM with PostgreSQL
- **State Management**: React Hooks and Context API
- **UI Components**: Custom components with Lucide React icons

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- PostgreSQL database

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="postgresql://username:password@localhost:5432/mira_elpaso"
NEXTAUTH_SECRET="your-nextauth-secret"
```

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up the database:

```bash
npx prisma migrate dev
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
/src
  /app                 # Next.js App Router pages
    /api               # API routes
    /events            # Event pages
    /login             # Authentication pages
    /signup            # User registration
    /profile           # User profile management
  /components          # Reusable UI components
    /ui                # Shadcn UI components
  /lib                 # Utility functions
  /providers           # Context providers
  /types               # TypeScript type definitions
/prisma                # Database schema and migrations
/public                # Static assets
```

## Authentication Flow

1. User registers via `/signup` page
2. Registration data is sent to `/api/auth/register`
3. Password is hashed using bcrypt
4. User data is stored in the database
5. User can log in via `/login` page using NextAuth.js
6. Protected routes check for authenticated sessions

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js](https://next-auth.js.org/)
- [Prisma ORM](https://www.prisma.io/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com/)

## Deployment

This application can be easily deployed on Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Configure environment variables in the Vercel dashboard
4. Deploy!

Alternatively, you can deploy to any platform that supports Next.js applications.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
