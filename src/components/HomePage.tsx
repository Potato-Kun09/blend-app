import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { User, Room } from '../types'
import { LogOut, Plus } from 'lucide-react'

interface HomePageProps {
  user: User
  onLogout: () => void
}

export default function HomePage({ user, onLogout }: HomePageProps) {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateRoom, setShowCreateRoom] = useState(false)
  const [newRoomName, setNewRoomName] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    loadRooms()
  }, [])

  const loadRooms = async () => {
    try {
      const { data, error: err } = await supabase.from('rooms').select('*').limit(10)
      if (err) throw err
      setRooms(data || [])
    } catch (err) {
      console.error('Error loading rooms:', err)
      setError('Failed to load rooms. Make sure your Supabase table exists.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRoomName.trim()) return

    try {
      const { data, error: err } = await supabase
        .from('rooms')
        .insert([
          {
            name: newRoomName,
            host_id: user.id,
            is_private: false,
          },
        ])
        .select()

      if (err) throw err
      if (data) {
        setRooms([...rooms, data[0]])
        setNewRoomName('')
        setShowCreateRoom(false)
        setError('')
      }
    } catch (err) {
      console.error('Error creating room:', err)
      setError('Failed to create room. Check your Supabase permissions.')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    onLogout()
  }

  return (
    <div className="min-h-screen bg-surface-900 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 px-6 py-4 bg-surface-900/80 backdrop-blur border-b border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">🎵 Blend</h1>
            <p className="text-white/40 text-sm">Welcome, {user.displayName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/50 hover:text-white"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Create Room Button */}
        <button
          onClick={() => setShowCreateRoom(!showCreateRoom)}
          className="w-full mb-8 py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          style={{ background: 'linear-gradient(135deg, #1DB954, #4F8EF7)' }}
        >
          <Plus size={20} />
          Create New Room
        </button>

        {/* Create Room Form */}
        {showCreateRoom && (
          <form onSubmit={handleCreateRoom} className="mb-8 p-6 card space-y-4">
            <div>
              <label className="text-sm font-semibold text-white/60 mb-2 block">Room Name</label>
              <input
                type="text"
                placeholder="e.g., Late Night Vibes"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                className="w-full bg-surface-600 border border-white/10 rounded-lg py-2 px-4 text-white placeholder-white/30 focus:outline-none focus:border-brand-green/50"
                autoFocus
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowCreateRoom(false)}
                className="flex-1 py-2 rounded-lg bg-white/5 font-semibold text-white/60 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-lg font-semibold text-white transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #1DB954, #4F8EF7)' }}
              >
                Create
              </button>
            </div>
          </form>
        )}

        {/* Rooms List */}
        <div>
          <h2 className="text-xl font-bold mb-4">Active Rooms</h2>
          {loading ? (
            <div className="text-center py-12 text-white/40">Loading rooms...</div>
          ) : rooms.length === 0 ? (
            <div className="text-center py-12 text-white/40">
              <p>No rooms yet. Create one to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="card p-4 hover:border-brand-green/50 cursor-pointer transition-all"
                >
                  <h3 className="font-bold text-lg">{room.name}</h3>
                  <p className="text-white/50 text-sm">{room.genre || 'Mixed'}</p>
                  <p className="text-white/40 text-xs mt-2">
                    {room.is_private ? '🔒 Private' : '🌐 Public'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
