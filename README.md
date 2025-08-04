# QuantBasket Monorepo

A modern monorepo structure for QuantBasket's web and mobile applications using Turborepo.

## 📁 Project Structure

```
/quantbasket-monorepo/
├── apps/
│   ├── web/          # React web dashboard (Vite + React)
│   └── mobile/       # React Native mobile app (Expo)
├── packages/
│   ├── ui/           # 🎨 Shared UI components
│   └── supabase-client/ # ✨ Shared Supabase client & types
├── package.json      # Root package.json with workspaces
└── turbo.json        # Turborepo configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd QBwebsite
   npm install
   ```

2. **Build all packages:**
   ```bash
   npm run build
   ```

3. **Start development servers:**
   ```bash
   # Start all apps in development mode
   npm run dev

   # Or start specific apps
   npm run web:dev    # Web app only
   npm run mobile:dev # Mobile app only
   ```

## � Apps & Packages

### Apps

#### `apps/web` - Web Dashboard
- **Framework:** Vite + React + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Backend:** Supabase
- **Deployment:** Vercel
- **URL:** [quantbasket.com](https://www.quantbasket.com)

**Development:**
```bash
cd apps/web
npm run dev
```

#### `apps/mobile` - Mobile App
- **Framework:** Expo + React Native + TypeScript
- **Backend:** Supabase (shared client)
- **Deployment:** App Store / Google Play

**Development:**
```bash
cd apps/mobile
npm run start
```

### Packages

#### `packages/ui` - Shared UI Components
Reusable React components that work in both web and mobile apps.

**Key Components:**
- Button, Card, Input, Select, etc.
- Toast notifications (Sonner)
- Form components
- Layout components

**Usage:**
```tsx
import { Button, Card } from '@quantbasket/ui';
```

#### `packages/supabase-client` - Shared Backend Client
Centralized Supabase configuration and authentication logic.

**Usage:**
```tsx
import { supabase, auth } from '@quantbasket/supabase-client';

// Authentication
await auth.signIn(email, password);
await auth.signOut();

// Database queries
const { data } = await supabase.from('users').select('*');
```

## 🛠 Development

### Turborepo Commands

```bash
# Build all packages and apps
npm run build

# Run development servers for all apps
npm run dev

# Lint all packages
npm run lint

# Type check all packages
npm run type-check

# Clean build artifacts
npm run clean
```

## 🚢 Deployment

### Web App (`apps/web`)
- **Platform:** Vercel
- **Build Command:** `npm run build --filter=web`
- **Environment Variables:** Set in Vercel dashboard

### Mobile App (`apps/mobile`)
- **Platform:** Expo EAS Build

## 🎯 Benefits of This Structure

1. **Code Sharing:** UI components and business logic shared between web and mobile
2. **Type Safety:** Shared TypeScript types across all apps
3. **Consistent Backend:** Single Supabase client configuration
4. **Fast Builds:** Turborepo's intelligent caching
5. **Developer Experience:** Single repository, coordinated development

## 📱 Next Steps for Mobile Development

1. **Install Expo CLI:**
   ```bash
   npm install -g @expo/cli
   ```

2. **Install mobile dependencies:**
   ```bash
   cd apps/mobile
   npm install
   ```

3. **Start the mobile app:**
   ```bash
   npm run mobile:dev
   ```

---

Built with ❤️ using Turborepo, React, React Native, and Supabase.