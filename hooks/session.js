import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

// Define types if needed for better clarity
// Otherwise, you can remove or replace them with comments describing each return type.

// Fetches the full session data
export const getSession = async () => {
  const { data } = await axios.get('/api/session')
  return data
}

// Fetches the basic session data
export const getBasicSession = async () => {
  const { data } = await axios.get('/api/session?action=basic')
  return data
}

// React Query hook for basic session data
export const useBasicSession = () => {
  return useQuery({
    queryKey: ['basicSession'],
    queryFn: getBasicSession,
  })
}

// Logs out the session
export const logoutSession = async () => {
  const { data } = await axios.get('/api/session?action=logout')
  return data
}

// Logs in with provided credentials
export const loginSession = async (credentials) => {
  const { data } = await axios.post('/api/session', credentials)
  return data
}

// Signs up with provided credentials
export const signupSession = async (credentials) => {
  const { data } = await axios.post('/api/session?action=signup', credentials)
  return data
}