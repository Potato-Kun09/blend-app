import React, { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import AuthScreen from './components/AuthScreen'
import HomePage from './components/HomePage'
import { User } from './types'

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          username: session.user.user_metadata?.username || 'User',
          displayName: session.user.user_metadata?.display_name || 'User',
          spotifyConnected: false,
        })
      }
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          username: session.user.user_metadata?.username || 'User',
          displayName: session.user.user_metadata?.display_name || 'User',
          spotifyConnected: false,
        })
      } else {
        setUser(null)
      }
    })

    return () => subscription?.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🎵</div>
          <p className="text-white/60">Loading Blend...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthScreen onAuth={(user) => setUser(user)} />
  }

  return <HomePage user={user} onLogout={() => setUser(null)} />
}
