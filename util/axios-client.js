import axios from 'axios'
import { getSession } from 'hooks/session'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
  async function (config) {
    // Before sending the request, this function checks if the request URL does not start with '/public'.
    // If so, it retrieves the session data to add an Authorization header with the token to the request
    if (config.url) {
      if (config.url && !config.url.startsWith('/api')) {
        config.baseURL = process.env.NEXT_PUBLIC_API_URL
      }

      if (!config.url.startsWith('/public')) {
        const sessionData = await getSession()
        const authToken = sessionData.token

        // Set the Authorization header for the request
        config.headers['Authorization'] = `Bearer ${authToken}`
      }
    }
    return config
  },
  function (error) {
    // If an error occurs before the request is sent (e.g., during configuration),
    // this function allows the error to be forwarded to the promise's .catch() handler.
    return Promise.reject(error)
  }
)

export { axiosClient }