# Explore - Marketing Landing Page

A modern, responsive marketing landing page built with Next.js 14, React 18, Tailwind CSS, and Framer Motion.

## Overview

This project implements a full-featured marketing landing page with all the key sections required for a compelling user acquisition funnel:

- **Hero Section**: Eye-catching headline with mission-driven copy
- **Feature Grid**: Four interactive cards highlighting core benefits
- **How It Works**: Step-by-step timeline explaining the onboarding process
- **Stats Ribbon**: Key metrics showcasing platform impact
- **Testimonials Slider**: Social proof with rotating user reviews
- **Dual CTAs**: Multiple call-to-action buttons optimized for conversion
- **Footer**: Comprehensive navigation and links

## Features

✨ **Modern Design**
- Clean, minimalist aesthetic with gradient accents
- Consistent use of Tailwind CSS for styling
- Responsive grid layouts that adapt to all screen sizes

🎬 **Motion & Animation**
- Subtle Framer Motion animations on scroll
- Tailwind CSS keyframe animations for continuous effects
- Smooth transitions and hover effects throughout

📱 **Mobile-First Responsive Design**
- Optimized for mobile devices (≤375px)
- Tailored layouts for tablets and large screens
- Touch-friendly interactive elements

🎯 **Copy Variants**
- Emphasis on discovering niche spots and hidden gems
- Time-tracking motivation and achievement language
- Exploration challenges and gamification messaging

## Technology Stack

- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3
- **Animation**: Framer Motion 10
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Structure

```
├── app/
│   ├── (marketing)/
│   │   ├── layout.tsx       # Marketing layout wrapper
│   │   └── page.tsx         # Main landing page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles and theme
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── next.config.js           # Next.js configuration
└── package.json             # Dependencies and scripts
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

### Production Build

```bash
npm run build
npm run start
```

## Design Highlights

### Hero Section
- Large, bold typography with gradient text
- Animated background blobs for visual interest
- Dual CTA buttons (primary and secondary)

### Feature Grid
- Four feature cards with icon backgrounds
- Hover animations and shadows
- Responsive grid (1 column mobile, 2 on tablet, 4 on desktop)

### Timeline Section
- Visual step-by-step process
- Numbered progression indicators
- Connected lines on desktop views

### Stats Ribbon
- Dark background with white text for contrast
- Quick facts about platform reach
- Emoji icons for visual appeal

### Testimonials
- Animated carousel with dot navigation
- Star ratings for credibility
- User avatars and roles

### CTAs
- Multiple conversion points above and below fold
- Contrasting colors for visibility
- Clear, action-oriented copy

## Performance

The landing page is optimized for performance:
- Static site generation where possible
- Optimized images and assets
- Minimal JavaScript with strategic code splitting
- Built-in Next.js optimization

## Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All sections are carefully tailored for each breakpoint with appropriate spacing, typography, and layout adjustments.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
