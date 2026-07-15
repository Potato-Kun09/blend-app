export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  spotifyConnected: boolean;
  email: string;
}

export interface Room {
  id: string;
  name: string;
  hostId: string;
  coverImage?: string;
  isPrivate: boolean;
  genre?: string;
  mood?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  roomId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
}
