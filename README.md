# Premium Travel Experience Platform

A modern, premium travel platform built with Next.js, TypeScript, and Tailwind CSS. This project features a curated travel experience with a sophisticated design aesthetic tailored for luxury travel.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) with Turbo mode
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Package Manager:** [pnpm](https://pnpm.io/)

## 📁 Project Structure

```
.
├── app/
│   ├── (marketing)/         # Marketing pages with grouped routing
│   │   └── page.tsx         # Main landing page
│   ├── layout.tsx           # Root layout with fonts and metadata
│   ├── globals.css          # Global styles with custom design tokens
│   └── page.tsx             # Root redirect
├── components/
│   └── ui/                  # Reusable UI components (shadcn/ui)
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── badge.tsx
│       └── dialog.tsx
├── lib/
│   ├── utils.ts             # Utility functions (cn helper)
│   └── analytics.ts         # Analytics and event tracking helpers
└── public/                  # Static assets
```

## 🎨 Design System

### Color Palette (Premium Travel Aesthetic)

- **Primary:** Deep Forest Green (#1a4d2e) - Represents nature and adventure
- **Secondary:** Warm Taupe (#8b7355) - Luxury and sophistication
- **Accent:** Golden Sand (#d4a574) - Warmth and premium feel
- **Muted:** Soft Cream (#f5f1ed) - Calm and elegant backgrounds

### Typography

- **Headings:** Playfair Display - Classic, elegant serif font
- **Body:** Geist Sans - Modern, clean sans-serif
- **Monospace:** Geist Mono - Technical content

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm installed globally (`npm install -g pnpm`)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd project
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Edit `.env.local` with your actual API keys and configuration.

### Development

Run the development server with Turbo mode:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `pnpm dev` - Start development server with Turbo mode
- `pnpm build` - Build the production application
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm type-check` - Run TypeScript type checking

## 🔧 Configuration

### Environment Variables

See `.env.example` for all required environment variables:

- **Supabase**: Database and authentication
- **Resend**: Email service
- **Analytics**: Google Analytics, PostHog, or Segment

### Tailwind CSS

The project uses Tailwind CSS v4 with custom design tokens defined in `app/globals.css`. The theme includes:

- Custom color palette for premium travel aesthetic
- Typography tokens with font family variables
- Border radius utilities
- Dark mode support

### ESLint & Prettier

- ESLint is configured with Next.js recommended rules
- Prettier is set up for consistent code formatting
- Both are integrated and run automatically

## 📦 Components

### UI Components (shadcn/ui)

All components are built with accessibility and customization in mind:

- **Button**: Multiple variants (default, destructive, outline, secondary, ghost, link)
- **Card**: Flexible card component with header, content, and footer
- **Input**: Styled input with focus states
- **Badge**: Small status indicators with variants
- **Dialog**: Modal component with overlay and animations

### Usage Example

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Get Started</Button>
      </CardContent>
    </Card>
  );
}
```

## 🧰 Utilities

### Class Variance Authority (CVA)

Used for creating component variants with type safety. See `components/ui/button.tsx` for an example.

### cn() Helper

A utility function that combines `clsx` and `tailwind-merge` for conditional class names:

```tsx
import { cn } from "@/lib/utils";

const className = cn("base-class", isActive && "active-class", customClass);
```

### Analytics

The `lib/analytics.ts` file provides helpers for tracking events:

```tsx
import { trackEvent } from "@/lib/analytics";

trackEvent("button_clicked", {
  page: "home",
  buttonName: "Get Started",
});
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

### Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- Fly.io

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run linting and formatting: `pnpm lint && pnpm format`
4. Run type checking: `pnpm type-check`
5. Commit your changes: `git commit -m "Add your feature"`
6. Push to the branch: `git push origin feature/your-feature`
7. Open a Pull Request

### Code Style

- Use TypeScript for all new files
- Follow the existing code structure and naming conventions
- Use Prettier for formatting (runs automatically)
- Ensure ESLint passes before committing
- Write meaningful commit messages

## 📄 License

This project is private and proprietary.

## 🆘 Support

For questions or issues, please open an issue in the repository.

---

Built with ❤️ using Next.js and shadcn/ui
