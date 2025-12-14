# Spotify Profile

A modern web application to view and explore your Spotify listening data, featuring an Instagram-style "Wrapped" experience.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Features

### 📊 Profile Dashboard

View your Spotify profile with an overview of your top artists, tracks, and playlists.

### 🎵 Top Tracks

Browse your most played tracks with time range filtering:

- Last 4 Weeks
- Last 6 Months
- All Time

### 🎤 Top Artists

Discover your favorite artists with infinite scrolling and time range selection.

### 📁 Playlists

View all your saved playlists with track counts and cover art.

### 🕐 Recently Played

See your listening history with timestamps.

### 🎁 Your Wrapped

Experience an Instagram-style story showcasing your listening stats:

- **Intro** - Personalized welcome
- **Estimated Minutes** - Total listening time
- **Top Songs** - Your top 5 tracks with album art
- **Top Artists** - Podium-style display of favorite artists
- **Top Genres** - Visual bar chart of your music taste
- **Top Albums** - Grid of your most played albums
- **Summary** - Complete overview with quick links

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/)
- A [Spotify Developer](https://developer.spotify.com/) account

### 1. Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click "Create App"
3. Fill in the app details:
   - App name: `Spotify Profile` (or your choice)
   - App description: Your description
   - Redirect URI: `http://localhost:3000/api/callback`
4. Save and note your **Client ID** and **Client Secret**

### 2. Clone and Install

```bash
git clone <your-repo-url>
cd spotify-profile

# Using Bun (recommended)
bun install

# Or using npm
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Spotify credentials:

```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/callback
```

### 4. Run the Development Server

```bash
# Using Bun
bun dev

# Or using npm
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Login with Spotify

Click the "Login with Spotify" button to authorize the app. You'll be redirected to Spotify to grant permissions.

## Usage Guide

### Navigation

Use the sidebar to navigate between different sections:

| Page               | Description                        |
| ------------------ | ---------------------------------- |
| `/profile`         | Your Spotify profile overview      |
| `/top-tracks`      | Your most played songs             |
| `/top-artists`     | Your favorite artists              |
| `/playlists`       | Your saved playlists               |
| `/recently-played` | Recent listening history           |
| `/wrapped`         | Instagram-style Wrapped experience |

### Wrapped Feature

1. Navigate to `/wrapped` from the sidebar
2. Select a time period (4 weeks, 6 months, or all time)
3. Click "Create Your Wrapped"
4. Navigate through slides:
   - **Click left edge** → Previous slide
   - **Click right edge** → Next slide
   - **Arrow keys** → Navigate left/right
   - **Escape** → Close
5. Click on any artist, track, or album to open it in Spotify

### Time Range Filtering

On Top Tracks and Top Artists pages, use the pill buttons to filter by:

- **Last 4 Weeks** - Recent listening
- **Last 6 Months** - Medium-term favorites
- **All Time** - Your lifetime favorites

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with Pages Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query) (React Query)
- **API**: [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- **Package Manager**: [Bun](https://bun.sh/) (npm compatible)

## Project Structure

```
├── components/         # React components
│   ├── wrapped/        # Wrapped feature components
│   │   ├── slides/     # Individual slide components
│   │   ├── WrappedContainer.tsx
│   │   ├── WrappedStory.tsx
│   │   └── ...
│   ├── ArtistCard.tsx
│   ├── TrackCard.tsx
│   └── ...
├── hooks/              # Custom React hooks
├── pages/              # Next.js pages
│   ├── api/            # API routes (auth)
│   └── ...
├── shared/             # Shared types and interfaces
├── utils/              # Utility functions
└── styles/             # Global styles
```

## Scripts

```bash
bun dev          # Start development server
bun build        # Build for production
bun start        # Start production server
bun lint         # Run ESLint
bun lint:fix     # Fix linting issues
```

## API Routes

| Route                | Description                  |
| -------------------- | ---------------------------- |
| `/api/login`         | Initiates Spotify OAuth flow |
| `/api/callback`      | Handles OAuth callback       |
| `/api/refresh_token` | Refreshes access token       |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Update Spotify app's Redirect URI to your production URL

### Other Platforms

Build the production bundle:

```bash
bun build
bun start
```

## Known Limitations

- **Audio Features API**: Spotify has restricted access to the Audio Features endpoint for most apps. The Listening Mood feature is currently disabled due to this limitation.
- **Listening Time**: The Spotify API doesn't provide actual listening time data, so we estimate based on track durations.

## License

MIT

## Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
