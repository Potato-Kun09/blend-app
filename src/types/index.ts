export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  spotifyConnected: boolean;
  email: string;
  role?: 'user' | 'admin';
}

export interface Room {
  id: string;
  name: string;
  host_id: string;
  coverImage?: string;
  is_private: boolean;
  genre?: string;
  mood?: string;
  created_at: string;
}

export interface Message {
  id: string;
  room_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
}
