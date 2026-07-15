import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { User } from '../types'
import { Crown, Unlock } from 'lucide-react'

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
          displayName: userData.user.user_metadata?.display_name || 'Admin',
          spotifyConnected: false,
          role: 'admin',
        })
      } else {
        throw new Error('❌ Invalid admin code')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {!showForm ? (
          <div className="text-center space-y-6">
            {/* Logo */}
            <div>
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Crown size={40} className="text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                BLEND ADMIN
              </h1>
              <p className="text-purple-300 text-sm">Exclusive Access Portal</p>
            </div>

            <p className="text-purple-200 text-sm leading-relaxed">
              Psst... 👀 There's a hidden admin portal here. Do you know the magic password?
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
            >
              🔓 Enter Admin Code
            </button>
          </div>
        ) : (
          <form onSubmit={handleAdminVerification} className="space-y-6">
            {/* Verification Step */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                  <Unlock size={40} className="text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-black text-white mb-2">Verify Admin Access</h1>
              <p className="text-purple-300 text-sm">Enter the magic password</p>
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm text-center">
                {error}
              </div>
            )}

            {/* Admin Code */}
            <div>
              <label className="text-sm font-semibold text-purple-300 mb-2 block">Magic Password</label>
              <input
                type="password"
                placeholder="Enter the magic password..."
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                className="w-full bg-black/50 border border-purple-500/30 rounded-lg py-3 px-4 text-white placeholder-purple-400/50 focus:outline-none focus:border-yellow-400 transition-colors"
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-pink-600 hover:from-yellow-600 hover:to-pink-700 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl"
            >
              {loading ? '✨ Unlocking...' : '🔓 Unlock Admin Portal'}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setAdminCode('')
                setError('')
              }}
              className="w-full text-purple-300 hover:text-purple-200 text-sm"
            >
              ← Back
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
