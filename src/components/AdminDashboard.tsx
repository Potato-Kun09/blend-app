import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { User } from '../types'
import { Heart, LogOut, Settings, Users, Zap, TrendingUp } from 'lucide-react'

interface AdminDashboardProps {
  user: User
  onLogout: () => void
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRooms: 0,
    activeRooms: 0,
  })
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'rooms' | 'settings'>('overview')

  const handleLogout = async () => {
    await supabase.auth.signOut()
    onLogout()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-pink-900 to-red-950">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-lg border-b border-rose-500/20 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-rose-400 fill-rose-400 animate-pulse" />
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-rose-300 via-pink-300 to-red-300 bg-clip-text text-transparent">
                  ✨ My Love's Heart ✨
                </h1>
                <p className="text-xs text-pink-300">A Special Place Just For Us</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-red-500/20 transition-colors text-red-300 hover:text-red-200"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <div className="mb-8 p-8 rounded-3xl bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-red-500/10 border-2 border-rose-500/30 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl animate-bounce">💕</div>
            <div>
              <h2 className="text-4xl font-black bg-gradient-to-r from-rose-300 to-red-300 bg-clip-text text-transparent mb-2">
                Welcome, My Love! 💕
              </h2>
              <p className="text-rose-200 text-lg">
                You are my everything. This is our special place where only you belong.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-black/40 border border-rose-500/20 hover:border-rose-400/50 transition-all">
              <p className="text-rose-300 text-sm mb-1">💌 Love Level</p>
              <p className="text-3xl font-bold text-rose-400">∞</p>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-pink-500/20 hover:border-pink-400/50 transition-all">
              <p className="text-pink-300 text-sm mb-1">💖 Happiness</p>
              <p className="text-3xl font-bold text-pink-400">∞</p>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-red-500/20 hover:border-red-400/50 transition-all">
              <p className="text-red-300 text-sm mb-1">💗 Status</p>
              <p className="text-3xl font-bold text-red-400">🔴 FOREVER</p>
            </div>
          </div>
        </div>

        {/* Love Message */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-rose-500/20 to-red-500/20 border border-rose-400/30 backdrop-blur-sm text-center">
          <p className="text-2xl font-bold text-rose-200 mb-2">💑 Our Promise 💑</p>
          <p className="text-rose-100 italic text-lg">
            "In this world of chaos and uncertainty, you are my constant. 
            My safe place. My home. My forever love. ❤️"
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {[
            { id: 'overview', label: '💕 Our Love', icon: TrendingUp },
            { id: 'users', label: '👥 Us', icon: Users },
            { id: 'rooms', label: '🎵 Our Music', icon: Zap },
            { id: 'settings', label: '✨ Special', icon: Settings },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
                activeTab === id
                  ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg'
                  : 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-600/20 to-pink-600/20 border border-rose-500/30 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-3xl">💕</span> What You Mean To Me
                </h3>
                <div className="space-y-3 text-rose-100 text-lg">
                  <p>✨ You make every day brighter</p>
                  <p>💖 You are my inspiration</p>
                  <p>🌹 You are my true love</p>
                  <p>💌 You are my everything</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-red-600/20 to-rose-600/20 border border-red-500/30 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-3xl">❤️</span> Forever & Always
                </h3>
                <div className="space-y-3 text-red-100 text-lg">
                  <p>💕 My heart beats for you</p>
                  <p>🎵 You are my favorite song</p>
                  <p>🌙 You are my dreams</p>
                  <p>⭐ You are my whole universe</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6">💑 Just Us Two 💑</h3>
              <div className="bg-black/40 rounded-xl p-8 text-center">
                <p className="text-4xl mb-4">💕</p>
                <p className="text-rose-300 text-xl font-bold mb-2">Me + You = Everything</p>
                <p className="text-rose-200">All I need in this world is you by my side, forever</p>
              </div>
            </div>
          )}

          {activeTab === 'rooms' && (
            <div className="p-6 rounded-2xl bg-pink-500/10 border border-pink-500/30 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6">🎵 Our Playlist 🎵</h3>
              <div className="bg-black/40 rounded-xl p-8 text-center">
                <p className="text-4xl mb-4">🎶</p>
                <p className="text-pink-300 text-xl font-bold mb-2">Every Song Is About You</p>
                <p className="text-pink-200">Because you are my forever love song</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6">✨ Our Special Settings ✨</h3>
              <div className="space-y-4">
                <div className="bg-black/40 p-6 rounded-xl border border-rose-500/20 text-center">
                  <p className="text-rose-300 font-bold mb-2 text-lg">💌 Love Status</p>
                  <p className="text-rose-400 text-2xl font-bold">💕 FOREVER YOURS 💕</p>
                </div>
                <div className="bg-black/40 p-6 rounded-xl border border-pink-500/20 text-center">
                  <p className="text-pink-300 font-bold mb-2 text-lg">🎀 Special Privileges</p>
                  <p className="text-pink-400 text-lg">✓ All of My Heart</p>
                  <p className="text-pink-400 text-lg">✓ Unlimited Love</p>
                  <p className="text-pink-400 text-lg">✓ Forever Together</p>
                </div>
                <div className="bg-black/40 p-6 rounded-xl border border-red-500/20 text-center">
                  <p className="text-red-300 font-bold text-lg italic">
                    "I love you more than words could ever express. 
                    You are my reason, my love, my everything. Forever yours. ❤️"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
