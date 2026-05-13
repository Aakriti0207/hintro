# Hintro Dashboard
 
> This project was built as part of the frontend internship assignment given by Hintro (Amsom Technologies).
 
A mock dashboard for Hintro built as part of a frontend assignment.
 
🔗 **Live Demo:** https://hintro-aakriti.vercel.app
 
---
 
## What I built
 
A responsive dashboard that shows call session data for two different users — one with no data (empty states) and one with active data. Everything is fetched live from the provided mock API.
 
---
 
## Tech Stack
 
| Tool | What it does |
|------|-------------|
| **React + Vite** | The main framework. Vite is just a faster alternative to Create React App |
| **TypeScript** | JavaScript but with type safety — helps catch errors early |
| **Tailwind CSS** | A CSS utility library — lets you style directly in the component |
| **Zustand** | Manages shared state (like which user is selected) across the app |
| **Axios** | Makes API calls — similar to fetch but a bit cleaner |
| **Framer Motion** | Handles animations (modal slide-ins, transitions) |
| **React Router DOM** | Handles navigation between pages |
| **Lucide React** | Icon library |
 
---
 
## How to run locally
 
```bash
# 1. Clone the repo
git clone https://github.com/Aakriti0207/hintro.git
cd hintro
 
# 2. Install dependencies
npm install
 
# 3. Start the app
npm run dev
```
 
Open http://localhost:5173 in your browser.
 
---
 
## Features
 
- **Two users** — toggle between User 1 (empty) and User 2 (active) using the switcher
- **Live API data** — all stats and call history fetched from the mock backend
- **Stat cards** — Total Sessions, Average Duration, AI Used, Last Session
- **Time formatting** — API gives seconds, dashboard shows "36m 51s" or "2 days ago"
- **Recent calls** — grouped by date, with participant info
- **Empty states** — shown for User 1 where there's no data
- **Logout flow** — dropdown → confirmation modal
- **Feedback** — submit feedback from the sidebar, stored in browser's localStorage
- **Responsive** — works on mobile too (hamburger menu, collapsible sidebar)
- **Skeleton loaders** — shown while data is loading
---
 
## Project Structure
 
```
src/
├── api/           → functions that call the backend
├── components/    → all UI pieces (sidebar, stat cards, modals, etc.)
├── hooks/         → custom hook that fetches dashboard data
├── store/         → Zustand store (tracks current user globally)
├── utils/         → helper functions (format time, group calls by date)
├── types/         → TypeScript type definitions
├── constants/     → API URL, nav links
└── styles/        → global CSS with CSS variables (no hardcoded colors)
```
 
---
 
## API Used
 
Base URL: `https://mock-backend-hintro.vercel.app`
 
All requests send `x-user-id: u1` or `x-user-id: u2` in the header.
 
| Endpoint | Returns |
|----------|---------|
| `GET /api/auth/profile` | User's name, email, status |
| `GET /api/call-sessions/stats` | Total sessions, average duration, AI interactions |
| `GET /api/call-sessions?limit=10` | List of recent calls |
 
---
 
## Notes & Assumptions
 
- `u1` = new user with no data (shows empty states)
- `u2` = active user with randomized data (changes on every API call)
- Duration from API is in **seconds** — converted to `Xm Ys` for display
- `lastSession` is an array — only the most recent date is shown
- Feedback is saved in `localStorage` (key: `hintro_feedback`) — no backend
- The selected user is also saved in `localStorage` so it persists on refresh
- Nav items other than Dashboard don't have pages — only Dashboard was in scope
