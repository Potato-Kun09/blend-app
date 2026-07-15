import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { spotifyAuth } from '../lib/spotify'
import { User } from '../types'
import { Mail, Lock, Eye, EyeOff, Music2 } from 'lucide-react'

interface AuthScreenProps {
  onAuth: (user: User) => void
}

export default function AuthScreen({ onAuth }: AuthScreenProps) {
  const [mode, setMode] = useState<'landing' | 'signin' | 'signup'>('landing')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
            username: displayName.toLowerCase().replace(/\s+/g, ''),
          },
        },
      })

      if (signUpError) throw signUpError

      if (data.user) {
        onAuth({
          id: data.user.id,
          email: data.user.email || '',
          username: displayName.toLowerCase().replace(/\s+/g, ''),
          displayName,
          spotifyConnected: false,
        })
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      if (data.user) {
        onAuth({
          id: data.user.id,
          email: data.user.email || '',
          username: data.user.user_metadata?.username || 'user',
          displayName: data.user.user_metadata?.display_name || 'User',
          spotifyConnected: false,
        })
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSpotifyLogin = () => {
    window.location.href = spotifyAuth.getAuthUrl()
  }

  return (
    <div className="min-h-screen bg-surface-900 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {mode === 'landing' ? (
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #1DB954, #4F8EF7)' }}
              >
                <Music2 size={28} className="text-white" />
              </div>
              <span className="text-4xl font-black tracking-tight">blend</span>
            </div>

            <h1 className="text-3xl font-bold mb-3 leading-tight">
              Listen together,<br />
              <span className="gradient-text">in perfect sync.</span>
            </h1>
            <p className="text-white/50 mb-10">
              Create rooms, share playlists, and experience music with friends — all in real time.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleSpotifyLogin}
                className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl font-semibold text-black transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #1DB954, #4F8EF7)' }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Continue with Spotify
              </button>

              <button
                onClick={() => setMode('signup')}
                className="w-full py-3.5 rounded-2xl font-semibold border border-white/10 text-white/80 hover:bg-white/5 transition-all"
              >
                Create Account
              </button>

              <button
                onClick={() => setMode('signin')}
                className="text-sm text-white/40 hover:text-white/60 transition-colors mt-6"
              >
                Already have an account? <span className="gradient-text font-semibold">Sign in</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp} className="space-y-4">
            <button
              type="button"
              onClick={() => setMode('landing')}
              className="mb-8 text-sm text-white/40 hover:text-white/70"
            >
              ← Back
            </button>

            <h2 className="text-2xl font-bold mb-2">
              {mode === 'signin' ? 'Welcome back' : 'Join Blend'}
            </h2>
            <p className="text-white/40 text-sm mb-6">
              {mode === 'signin' ? 'Sign in to your account' : 'Create your free account'}
            </p>

            {error && <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm">{error}</div>}

            {mode === 'signup' && (
              <div>
                <label className="text-xs font-semibold text-white/60 mb-2 block">Display Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-surface-600 border border-white/10 rounded-2xl py-3 px-4 text-white placeholder-white/30 focus:outline-none focus:border-brand-green/50"
                  required
                />
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-white/60 mb-2 block">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-600 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-brand-green/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/60 mb-2 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-600 border border-white/10 rounded-2xl py-3 pl-11 pr-11 text-white placeholder-white/30 focus:outline-none focus:border-brand-green/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #1DB954, #4F8EF7)' }}
            >
              {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
