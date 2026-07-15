# Complete Setup Guide for Blend

## Step 1: Create Supabase Account & Project

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub (easiest)
4. Create a new project (pick a region close to you)
5. Wait for it to initialize

## Step 2: Create Database Tables

In Supabase, go to **SQL Editor** and run:

```sql
-- Users table
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text not null,
  avatar text,
  bio text,
  spotify_user_id text,
  spotify_access_token text,
  created_at timestamp default now()
);

-- Rooms table
create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  host_id uuid not null references public.users(id),
  cover_image text,
  is_private boolean default false,
  genre text,
  mood text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Room members
create table public.room_members (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  joined_at timestamp default now(),
  unique(room_id, user_id)
);

-- Messages
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  user_id uuid not null references public.users(id),
  content text not null,
  created_at timestamp default now()
);

-- Queue items
create table public.queue_items (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  spotify_track_id text not null,
  added_by_id uuid not null references public.users(id),
  votes int default 0,
  position int,
  created_at timestamp default now()
);
```

## Step 3: Get Supabase Credentials

1. In Supabase dashboard, go to **Settings → API**
2. Copy your:
   - Project URL → `VITE_SUPABASE_URL`
   - Anon Public Key → `VITE_SUPABASE_ANON_KEY`

## Step 4: Create Spotify App

1. Go to https://developer.spotify.com/dashboard
2. Log in or create account
3. Click "Create an app"
4. Accept terms and create
5. Go to app settings
6. Copy **Client ID** → `VITE_SPOTIFY_CLIENT_ID`
7. Click "Show Client Secret" → `VITE_SPOTIFY_CLIENT_SECRET`
8. Add redirect URI: `http://localhost:5173/callback`

## Step 5: Create .env.local

In your project root, create `.env.local`:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
VITE_SPOTIFY_CLIENT_ID=abc123def456
VITE_SPOTIFY_REDIRECT_URI=http://localhost:5173/callback
```

## Step 6: Install & Run

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Step 7: Deploy to Vercel

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your GitHub repo
5. Add environment variables (from your .env.local)
6. Click Deploy

Your app is now live! 🎉

## Troubleshooting

**"Missing Supabase credentials"**
- Check `.env.local` has correct URL and key
- Restart dev server after adding env vars

**"Spotify authentication failed"**
- Verify Client ID in .env.local
- Check redirect URI in Spotify dashboard matches

**"Can't create rooms"**
- Make sure database tables are created
- Check Supabase RLS policies (should allow authenticated users)

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Share link with friends
3. ✅ Test creating rooms
4. ✅ Connect Spotify accounts
5. ✅ Start listening together!
