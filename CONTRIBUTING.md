# Contributing Guide

Thank you for your interest in contributing to the Premium Travel Experience Platform! This guide will help you get started.

## 🚀 Quick Start

1. **Fork and clone the repository**

   ```bash
   git clone <your-fork-url>
   cd project
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

## 🔧 Development Workflow

### Creating a New Feature

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments for complex logic

3. **Test your changes**

   ```bash
   pnpm dev  # Test locally
   pnpm type-check  # Check TypeScript types
   pnpm lint  # Run ESLint
   pnpm format  # Format with Prettier
   ```

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 Code Style Guidelines

### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid using `any` - use `unknown` or proper types instead
- Use type inference when possible

```tsx
// Good
interface UserProps {
  name: string;
  email: string;
}

function User({ name, email }: UserProps) {
  // ...
}

// Bad
function User(props: any) {
  // ...
}
```

### React Components

- Use functional components with hooks
- Name components in PascalCase
- Keep components small and focused
- Extract complex logic into custom hooks

```tsx
// Good
export function MyComponent({ title }: { title: string }) {
  return <div>{title}</div>;
}

// Bad
export default function myComponent(props) {
  return <div>{props.title}</div>;
}
```

### File Naming

- React components: `PascalCase.tsx`
- Utilities and helpers: `camelCase.ts`
- Configuration files: `lowercase.config.ts`

### Import Order

1. React and Next.js imports
2. Third-party packages
3. Local components
4. Local utilities
5. Types
6. Styles

```tsx
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@radix-ui/react-button";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { UserProps } from "@/types";

import "./styles.css";
```

## 🎨 Styling Guidelines

### Tailwind CSS

- Use Tailwind utility classes
- Use the `cn()` helper for conditional classes
- Follow the design system color palette
- Use design tokens from `globals.css`

```tsx
import { cn } from "@/lib/utils";

function Component({ isActive }: { isActive: boolean }) {
  return (
    <div className={cn("rounded-lg p-4", isActive && "bg-primary text-primary-foreground")}>
      Content
    </div>
  );
}
```

### Custom Components

- Use shadcn/ui patterns for new components
- Support variants with class-variance-authority
- Make components accessible (ARIA attributes)
- Add proper TypeScript types

## 🧪 Testing

Currently, the project doesn't have tests set up. When adding tests:

- Write unit tests for utilities
- Write integration tests for components
- Test edge cases and error states
- Aim for high code coverage

## 📦 Adding Dependencies

Before adding a new dependency:

1. Check if it's really needed
2. Evaluate package size and maintenance
3. Check for security vulnerabilities
4. Document why it's needed in your PR

```bash
pnpm add package-name
# or for dev dependencies
pnpm add -D package-name
```

## 🐛 Reporting Bugs

When reporting bugs, please include:

1. Description of the issue
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Screenshots (if applicable)
6. Environment details (OS, browser, etc.)

## ✨ Feature Requests

When proposing features:

1. Describe the problem it solves
2. Explain your proposed solution
3. Consider alternatives
4. Discuss potential drawbacks

## 📋 Commit Message Convention

We follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:

```
feat: add user authentication
fix: resolve navigation bug on mobile
docs: update README with deployment instructions
style: format code with prettier
refactor: simplify analytics helper
```

## 🔍 Code Review Process

All contributions go through code review:

1. **Automated checks** - Linting, type checking, and tests must pass
2. **Code review** - A maintainer will review your code
3. **Feedback** - Address any requested changes
4. **Merge** - Once approved, your PR will be merged

## 🤝 Community Guidelines

- Be respectful and inclusive
- Help others when you can
- Ask questions when you're stuck
- Share knowledge and learnings
- Have fun building together!

## 📞 Getting Help

- Open an issue for bugs or feature requests
- Ask questions in discussions
- Check existing issues before creating new ones

Thank you for contributing! 🎉
