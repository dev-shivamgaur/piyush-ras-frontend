# Piyush Ras — Frontend

[![View Demo](https://img.shields.io/badge/View%20Demo-piyushras.vercel.app-8b5a2b?style=for-the-badge&logo=vercel&logoColor=white)](https://piyushras.vercel.app/)

**Piyush Ras** is a Hindi poetry (कविता) web app by Piyush Gaur. Readers can explore kavitā, like and bookmark poems, comment in real time, and share pieces. Admins can upload and manage poetry from a protected dashboard.

**Live site:** [https://piyushras.vercel.app/](https://piyushras.vercel.app/)

---

## Features

| Area | Details |
|------|---------|
| **Home** | Latest poetry grid with skeleton loading and link to all kavitā |
| **Browse** | `/allKavita` — full poetry listing with cards |
| **Read** | `/read?k=<id>` — single poem view with SEO via `react-helmet-async` |
| **Engagement** | Likes, bookmarks, comments, share; live updates via **Socket.IO** |
| **Auth** | Email/password signup & login, **Google OAuth**, JWT refresh flow |
| **Profile** | Bookmarks, liked poems, logout (`/profiledashboard`) |
| **Admin** | Protected `/dashboard` — upload, edit, delete poetry; upload progress page |
| **About** | Creator intro and mission (`/about`) |

---

## Tech stack

- **React** 19 · **Vite** 8  
- **Tailwind CSS** 4 (`@tailwindcss/vite`)  
- **React Router DOM** 7  
- **Redux Toolkit** + **React Redux** (auth & upload state)  
- **Axios** — API calls to backend  
- **Socket.IO Client** — real-time reactions/comments  
- **Google OAuth** (`@react-oauth/google`)  
- **React Hook Form** · **React Hot Toast** · **SweetAlert2**  
- **React Icons** · **React Helmet Async** · **UUID**

---

## Project structure

```
Frontend/
├── public/              # Static assets (logo, hero images)
├── socket.js            # Socket.IO client instance
├── vercel.json          # SPA rewrites for Vercel
├── src/
│   ├── App.jsx          # Layout: Header, Outlet, Footer
│   ├── main.jsx         # Router, Redux, Google OAuth providers
│   ├── pages/           # Route-level pages
│   ├── components/      # UI (Home, Cards, KavitaCard, Dashboard, …)
│   ├── services/        # API: poetry, user, comment, reaction, bookmark
│   └── store/           # Redux slices (auth, upload)
```

---

## Routes

| Path | Access | Description |
|------|--------|-------------|
| `/` | Public | Home — latest kavitā |
| `/allKavita` | Public | All poetry cards |
| `/read?k=<id>` | Public | Read poem by ID |
| `/read/loggedInUser?lk=<id>` | Logged in | Read with user-specific data |
| `/login`, `/signup` | Public only | Auth (redirect if logged in) |
| `/dashboard` | Admin | Manage & upload poetry |
| `/uploadProgressPage` | Admin | Upload progress |
| `/profiledashboard` | User | Profile, bookmarks, likes |
| `/about` | Public | About Piyush Ras |
| `*` | Public | 404 page |

---

## Prerequisites

- **Node.js** (LTS recommended)  
- **npm** (or compatible package manager)  
- Running **Backend** API (see repo `Backend/`)  
- **Google Cloud** OAuth client ID (for Google sign-in)

---

## Environment variables

Create a `.env` file in `Frontend/`:

```env
VITE_CORS_ORIGIN=          # Backend base URL (API + Socket.IO)
VITE_CLIENT_ID=            # Google OAuth client ID
VITE_ADMIN_EMAIL=          # Admin email for dashboard access
VITE_REQUIRED_URL=         # Used by comment/reaction services
```

> Do not commit `.env` to version control.

---

## Setup

```bash
cd Frontend
npm install
npm run dev
```

App runs at `http://localhost:5173` (default Vite port).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## Deployment

The app is deployed on **Vercel** with SPA routing configured in `vercel.json` (all routes rewrite to `/`).

1. Connect the `Frontend` folder to Vercel  
2. Set the same `VITE_*` environment variables in the Vercel project settings  
3. Build command: `npm run build` · Output directory: `dist`

---

## API services

| Service | File | Purpose |
|---------|------|---------|
| Poetry | `src/services/poetry.service.js` | Fetch, upload, delete kavitā |
| User | `src/services/user.service.js` | Login, signup, tokens, profile |
| Comments | `src/services/comment.service.js` | Poem comments |
| Reactions | `src/services/reaction.service.js` | Likes |
| Bookmarks | `src/services/bookmark.service.js` | Save poems |

---

## License

Private project — all rights reserved unless stated otherwise.
