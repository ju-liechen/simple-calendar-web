import { getIronSession } from 'iron-session'
import { axiosClient } from 'util/axios-client'

const defaultSession = {
  userId: '',
  token: '',
  isLoggedIn: false,
  isAdmin: false,
  createdAt: -1,
}

// Session options for iron-session configuration
const sessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: 'session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production', // Only secure in production
  },
}

const login = async (credentials) => {
  const { data } = await axiosClient.post('/public/user/login', credentials)
  return data
}

const signup = async (credentials) => {
  const { data } = await axiosClient.post('/public/user/signup', credentials)
  return data
}

export default async function handler(req, res) {
  res.setHeader('cache-control', 'no-store, max-age=0')
  const session = await getIronSession(req, res, sessionOptions)

  // POST request handling (for session creation)
  if (req.method === 'POST') {
    const action = req.query.action

    try {
      let authResponse = null
      if (action === 'signup') {
        authResponse = await signup(req.body)
      } else {
        authResponse = await login(req.body)
      }

      const ttl = req.body.rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24
      sessionOptions.ttl = ttl
      sessionOptions.cookieOptions = {
        ...sessionOptions.cookieOptions,
        maxAge: ttl,
      }
      session.token = authResponse.token
      session.isLoggedIn = true
      session.isAdmin = authResponse.isAdmin
      session.createdAt = Date.now()
      session.updateConfig(sessionOptions)
      await session.save()
      return res.status(200).json({ success: true })
    } catch (error) {
      console.error(error)
      if (error.response?.status && error.response?.data) {
        return res.status(error.response.status).json(error.response.data)
      } else {
        return res.status(500).json({ message: 'Internal Server Error' })
      }
    }
  }

  // GET request handling
  if (req.method === 'GET') {
    const action = req.query.action

    // Handle logout
    if (action === 'logout') {
      session.destroy()
      return res.status(200).json(defaultSession)
    }

    if (session.isLoggedIn !== true) {
      res.status(200).json(defaultSession)
    } else {
      if (action === 'basic') {
        // Don't expose the token to the client
        const { token, ...basicSession } = session
        res.status(200).json(basicSession)
        return
      } else {
        res.status(200).json(session)
      }
    }
    return
  }

  // If the method is not supported
  res.status(405).end(`Method ${req.method} Not Allowed`)
}