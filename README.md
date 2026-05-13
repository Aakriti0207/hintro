# Hintro Dashboard

A production-quality frontend dashboard for Hintro — built with React, TypeScript, Tailwind CSS, Zustand, and Framer Motion.

## Tech Stack

- **React 18** + **Vite** — lightning-fast dev server & build
- **TypeScript** — strict, fully typed
- **Tailwind CSS** — utility-first, CSS variable theme system
- **Zustand** — clean global state management
- **Axios** — centralized API layer with request interceptors
- **React Router DOM v6** — routing
- **React Hot Toast** — elegant notifications
- **Lucide React** — icon system
- **Framer Motion** — smooth animations

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone or unzip the project
cd hintro-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── api/              # Axios instance + API call functions
├── components/
│   ├── layout/       # Sidebar, Topbar
│   ├── dashboard/    # StatCard, StatsGrid, RecentCalls, CallSessionRow, WelcomeSection, EmptyCalls
│   ├── common/       # LogoutModal, UserSwitcher
│   ├── feedback/     # FeedbackModal, FeedbackHistoryModal
│   └── ui/           # Skeleton, Avatar, Button, Modal (primitives)
├── pages/            # DashboardPage
├── hooks/            # useDashboardData (data fetching)
├── store/            # Zustand store (global state)
├── utils/            # formatDuration, formatRelativeDate, groupSessionsByDate, etc.
├── types/            # TypeScript interfaces
├── constants/        # API base URL, nav items, avatar colors
├── layouts/          # MainLayout
└── styles/           # globals.css (CSS variable theme system)
```

---

## Features

### 👥 Dual User Mode
- **u1** — new user: empty states everywhere (no calls, zero stats)
- **u2** — active user: populated data, randomized call sessions & stats
- Switch via the **DEV toggle** (bottom-right corner)
- Selected user stored in `localStorage`

### 📊 Dashboard
- Welcome section with user's first name from API
- 4 stat cards: Total Sessions, Average Duration, AI Used, Last Session
- Recent calls grouped by date with time formatting
- Three-dot context menu on each call row

### ⏱ Time Formatting
- `2211s → 36m 51s`
- `8000s → 2h 13m`
- Last session → `"2 days ago"`, `"Just now"`, etc.

### 💬 Feedback System
- Submit feedback with star rating + message
- Stored in `localStorage`
- View full feedback history
- Accessible via sidebar

### 🔒 Logout Flow
- Profile dropdown in topbar
- Confirmation modal with cancel/confirm
- Smooth animations

### 📱 Fully Responsive
- Desktop: fixed sidebar + topbar
- Mobile: slide-in drawer with hamburger menu + overlay backdrop
- Adaptive stat grid (2 cols mobile → 4 cols desktop)
- Touch-friendly interactions

### 🎨 Theme System
- All colors via CSS custom properties — zero hardcoded values
- Consistent spacing, radius, shadow variables
- DM Sans + Sora font pairing

### ⚡ Loading States
- Skeleton loaders for stat cards, call history, profile
- Smooth entrance animations on data load

### ❌ Empty States
- Beautiful illustrated empty state for no calls
- Error fallback UI for failed API requests

---

## API Integration

Base URL: `https://mock-backend-hintro.vercel.app`

| Endpoint | Description |
|---|---|
| `GET /api/auth/profile` | User profile |
| `GET /api/auth/dashboard` | Dashboard + subscription + usage |
| `GET /api/call-sessions/stats` | Call statistics |
| `GET /api/call-sessions?limit=10` | Recent call sessions |

All requests automatically include `x-user-id: u1 | u2` header via Axios interceptor.

---

## Conventions & Assumptions

- **No auth flow** — assignment focuses on dashboard UI; auth is mocked
- **Single route** — `/` renders the dashboard; other nav items show coming-soon placeholder
- **localStorage keys**: `hintro_user_id`, `hintro_feedback`
- **Feedback** stored locally; no backend persistence
- Avatar colors are deterministic (based on first character of name)
- All time values from API are in seconds
- `lastSession` array — most recent date is used for "X days ago" display

---

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | TypeScript check + Vite build |
| `npm run preview` | Preview production build |
