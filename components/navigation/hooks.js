
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { axiosClient } from 'util/axios-client'
import { logoutSession } from 'hooks/session'

export const useUser = (args = {}) => {
  const result = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/user/my-profile')
      return data
    },
    ...args,
  })
  return result
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const logoutMutation = useMutation({
    mutationFn: logoutSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['basicSession'] })
    },
    onError: (error) => {
      console.error('Logout error', error)
    },
  })

  const handleLogout = async () => {
    await logoutMutation.mutateAsync()
    window.location = '/'
  }

  return { handleLogout }
}
