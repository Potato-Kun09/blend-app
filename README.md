# 🎵 Blend - Listen Together in Perfect Sync

A real-time music social app where friends listen to Spotify together with synchronized playback, live chat, and collaborative queues.

## Features

✅ **User Authentication** - Email, Google, Spotify OAuth  
✅ **Real-time Rooms** - Create or join listening rooms  
✅ **Live Chat** - Message with friends while listening  
✅ **Collaborative Queue** - Vote on next songs  
✅ **Spotify Integration** - Connect your Premium account  
✅ **Synchronized Playback** - All users hear the same song at the exact same moment  
✅ **Friend System** - Add friends and see their status  
✅ **Discover** - Find trending rooms and music  

## Quick Start

### 1. Setup Environment

```bash
npm install
```

Create `.env.local`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_SPOTIFY_CLIENT_ID=your_spotify_id
VITE_SPOTIFY_REDIRECT_URI=http://localhost:5173/callback
```

### 2. Run Development Server

```bash
npm run dev
```

Open http://localhost:5173

### 3. Build for Production

```bash
npm run build
```

## Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Music API**: Spotify Web API
- **Deployment**: Vercel

## Setup Guides

See [SETUP.md](./SETUP.md) for detailed instructions on:
- Creating a Supabase project
- Setting up Spotify Developer app
- Deploying to Vercel

## Architecture

```
User → React App → Supabase (Auth, DB, Real-time) → Spotify API
                  ↓
              WebSocket (Playback Sync)
```

## Contributing

We welcome contributions! Please feel free to submit PRs.

## License

MIT
