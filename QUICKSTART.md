# Quick Start Guide

Get up and running in 5 minutes! 🚀

## Prerequisites

Before you begin, make sure you have:

- Node.js 18 or higher installed
- pnpm installed globally: `npm install -g pnpm`

## Installation Steps

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys (optional for initial development).

### 3. Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app! 🎉

## What You'll See

The landing page features:

- Hero section with premium travel messaging
- Search interface with destination, date, and traveler inputs
- Feature cards showcasing the platform benefits
- Fully responsive design with mobile-first approach
- Premium color palette with travel aesthetic
- Custom typography using Playfair Display for headings

## Next Steps

### Explore the Codebase

- `app/(marketing)/page.tsx` - Main landing page
- `components/ui/` - Reusable UI components
- `lib/utils.ts` - Utility functions
- `app/globals.css` - Design system tokens

### Available Commands

```bash
pnpm dev          # Start development server with Turbo
pnpm build        # Build for production
pnpm start        # Run production server
pnpm lint         # Check code quality
pnpm format       # Format code
pnpm type-check   # Check TypeScript types
```

### Add Your First Feature

1. **Create a new page:**

   ```bash
   # Create a new route group or page in app/
   touch app/(marketing)/about/page.tsx
   ```

2. **Use existing components:**

   ```tsx
   import { Button, Card, CardHeader, CardTitle } from "@/components/ui";

   export default function AboutPage() {
     return (
       <Card>
         <CardHeader>
           <CardTitle>About Us</CardTitle>
         </CardHeader>
       </Card>
     );
   }
   ```

3. **Style with Tailwind:**
   ```tsx
   <div className="bg-primary text-primary-foreground p-4 rounded-lg">
     Premium Travel Experience
   </div>
   ```

### Integrate Services

#### Supabase (Database & Auth)

1. Create a project at [supabase.com](https://supabase.com)
2. Add credentials to `.env.local`
3. Install Supabase client: `pnpm add @supabase/supabase-js`

#### Resend (Email)

1. Get API key from [resend.com](https://resend.com)
2. Add to `.env.local`
3. Install Resend: `pnpm add resend`

#### Analytics

Configure your preferred analytics provider in `.env.local` and update `lib/analytics.ts`.

## Need Help?

- 📖 Check the [README.md](./README.md) for detailed documentation
- 🤝 Read [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines
- 🐛 Open an issue if you encounter problems

## Tips

- Use `--turbo` flag for faster development (already included in `pnpm dev`)
- Hot reload is enabled - changes appear instantly
- TypeScript provides autocomplete and type checking
- Tailwind CSS IntelliSense extension is recommended for VS Code

Happy coding! ✨
