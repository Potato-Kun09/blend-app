import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { User } from '../types'
import { Heart, Sparkles } from 'lucide-react'

interface AdminLoginProps {
  onAdminAuth: (user: User) => void
}

export default function AdminLogin({ onAdminAuth }: AdminLoginProps) {
  const [adminCode, setAdminCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)

  const handleAdminVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Check if admin code matches the special password
      if (adminCode === 'soso<3mico') {
        const { data: userData } = await supabase.auth.getUser()

        if (!userData.user) throw new Error('User not found')

        onAdminAuth({
          id: userData.user.id,
          email: userData.user.email || '',
          username: userData.user.user_metadata?.username || 'admin',
          displayName: userData.user.user_metadata?.display_name || 'My Love',
          spotifyConnected: false,
          role: 'admin',
        })
      } else {
        throw new Error('❌ Invalid code, babe')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-pink-900 to-red-950 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Romantic animated background with floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-4000"></div>
        
        {/* Floating hearts */}
        <div className="absolute top-10 left-10 text-3xl animate-bounce" style={{animationDelay: '0s'}}>💕</div>
        <div className="absolute top-20 right-20 text-2xl animate-bounce" style={{animationDelay: '0.5s'}}>💖</div>
        <div className="absolute bottom-20 left-1/4 text-2xl animate-bounce" style={{animationDelay: '1s'}}>💗</div>
        <div className="absolute bottom-32 right-1/4 text-3xl animate-bounce" style={{animationDelay: '1.5s'}}>💝</div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {!showForm ? (
          <div className="text-center space-y-6 animate-fade-in">
            {/* Romantic Logo */}
            <div>
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-rose-400 via-pink-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                  <Heart size={56} className="text-white fill-white" />
                </div>
              </div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-rose-300 via-pink-300 to-red-300 bg-clip-text text-transparent mb-3 drop-shadow-lg">
                💕 My Love 💕
              </h1>
              <p className="text-xl text-pink-200 font-semibold mb-2">Welcome to Our Special Place</p>
              <p className="text-pink-300 text-sm italic">A little secret garden just for us...</p>
            </div>

            <div className="space-y-4 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-pink-300/30">
              <p className="text-pink-100 text-lg leading-relaxed">
                ✨ You found our hidden love portal ✨
              </p>
              <p className="text-pink-200 text-sm">
                This special place is unlocked with a password that's uniquely ours. Do you remember it? 💘
              </p>
              <div className="pt-2 text-2xl">🌹</div>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="w-full py-3 rounded-full font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 hover:from-rose-600 hover:via-pink-600 hover:to-red-600 transition-all shadow-lg hover:shadow-2xl hover:scale-105 text-lg"
            >
              💌 Open My Heart
            </button>
          </div>
        ) : (
          <form onSubmit={handleAdminVerification} className="space-y-6 animate-fade-in">
            {/* Romantic Verification */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                  <Sparkles size={40} className="text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-black text-white mb-2">💕 Only For You 💕</h1>
              <p className="text-pink-200 text-sm italic">Whisper our secret to unlock your special place...</p>
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-red-500/30 border border-red-400/50 text-red-100 text-sm text-center font-semibold">
                {error}
              </div>
            )}

            {/* Password Input */}
            <div>
              <label className="text-sm font-bold text-pink-200 mb-3 block flex items-center gap-2 justify-center">
                <Heart size={16} /> Our Secret <Heart size={16} />
              </label>
              <input
                type="password"
                placeholder="Shhh... only we know this 🤫"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border-2 border-pink-300/50 rounded-full py-3 px-6 text-white placeholder-pink-300/40 focus:outline-none focus:border-rose-400 transition-all text-center text-lg tracking-widest font-semibold"
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 hover:from-rose-600 hover:via-pink-600 hover:to-red-600 transition-all disabled:opacity-50 shadow-lg hover:shadow-2xl hover:scale-105"
            >
              {loading ? '💕 Unlocking...' : '💌 Unlock My Heart'}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setAdminCode('')
                setError('')
              }}
              className="w-full text-pink-300 hover:text-rose-300 text-sm font-semibold"
            >
              ← Go Back
            </button>

            <p className="text-pink-200/60 text-xs text-center italic">
              "All I want in this world is you, my love" 💑
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
