const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const SPOTIFY_REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize'
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
const SPOTIFY_API_URL = 'https://api.spotify.com/v1'

export const spotifyAuth = {
  getAuthUrl: () => {
    const params = new URLSearchParams({
      client_id: SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: SPOTIFY_REDIRECT_URI,
      scope: [
        'streaming',
        'user-read-email',
        'user-read-private',
        'user-library-read',
        'user-read-playback-state',
        'user-modify-playback-state'
      ].join(' ')
    })
    return `${SPOTIFY_AUTH_URL}?${params}`
  },

  getAccessToken: async (code: string) => {
    const response = await fetch(SPOTIFY_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: SPOTIFY_CLIENT_ID,
        grant_type: 'authorization_code',
        code,
        redirect_uri: SPOTIFY_REDIRECT_URI,
      }).toString(),
    })
    return response.json()
  },
}

export const spotifyApi = {
  search: async (query: string, accessToken: string) => {
    const response = await fetch(
      `${SPOTIFY_API_URL}/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    return response.json()
  },

  getCurrentTrack: async (accessToken: string) => {
    const response = await fetch(`${SPOTIFY_API_URL}/me/player/currently-playing`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    if (response.status === 204) return null
    return response.json()
  },
}
