# Waitlist Application

A modern waitlist application built with Next.js 14, featuring email capture, Supabase integration, and automated welcome emails via Resend.

## Features

- ✅ Modern, responsive waitlist form with shadcn/ui components
- ✅ Client-side validation with Zod
- ✅ Supabase database integration with unique email constraints
- ✅ Referral system with tracking
- ✅ Rate limiting and spam protection
- ✅ Automated welcome emails via Resend
- ✅ Instant feedback states for form submissions
- ✅ Beautiful gradient UI with Tailwind CSS

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Supabase account and project
- A Resend account and API key
- A domain configured with Resend (for production)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update the following variables in `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Resend Configuration
RESEND_API_KEY=re_your_api_key_here

# Email Configuration
FROM_EMAIL=noreply@yourdomain.com

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set Up Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the migration script from `supabase/migrations/001_create_emails_table.sql`

This will create:
- The `emails` table with proper schema
- Unique index on email addresses
- Row Level Security policies
- Automatic timestamp updates

### 4. Configure Resend

1. Sign up at [Resend](https://resend.com)
2. Add and verify your domain
3. Create an API key
4. Update `FROM_EMAIL` to use your verified domain

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Database Schema

The `emails` table includes:

- `id` (UUID): Primary key
- `email` (VARCHAR): User's email (unique)
- `first_name` (VARCHAR): User's first name
- `home_city` (VARCHAR): Optional home city
- `home_country` (VARCHAR): Optional home country
- `travel_interest` (VARCHAR): Optional travel interest
- `referred_by` (UUID): Optional reference to another user
- `created_at` (TIMESTAMP): When the user joined
- `updated_at` (TIMESTAMP): Last update time

## API Endpoints

### POST /api/waitlist

Adds a new user to the waitlist.

**Request Body:**
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "homeCity": "San Francisco",
  "homeCountry": "United States",
  "travelInterest": "Adventure & Outdoor",
  "referredBy": "uuid-of-referrer"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Successfully joined the waitlist!",
  "referralLink": "http://localhost:3000/?ref=user-uuid"
}
```

**Error Responses:**
- 400: Validation error
- 409: Email already exists
- 429: Rate limit exceeded
- 500: Server error

## Security Features

- Rate limiting by IP address
- Duplicate email prevention with unique database constraint
- Input validation on both client and server
- Sanitized error messages
- Row Level Security in Supabase
- Service role key used only server-side

## Deployment

### Environment Variables

Ensure all environment variables are properly set in your deployment platform:

- Vercel: Add in Project Settings → Environment Variables
- Netlify: Add in Site Settings → Environment Variables
- Other platforms: Follow platform-specific instructions

### Build Command

```bash
npm run build
```

### Start Command

```bash
npm start
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend
- **TypeScript**: Full type safety

## License

MIT
