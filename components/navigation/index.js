import { AnimatePresence, motion } from 'framer-motion'

import { useBasicSession } from 'hooks/session'
import { useLogout, useUser } from './hooks'
import { Button } from 'components/button'

import styles from './navigation.module.scss'

export const Navigation = () => {
  const { handleLogout } = useLogout()
  const { data: userData } = useUser()

  const {
    data: basicSessionData,
    isLoading: basicSessionIsLoading,
    isError: basicSessionIsError,
    error: basicSessionError,
  } = useBasicSession()

  return (
    <div className={styles['nav-wrapper']}>
      <h1>Simple Calendar App</h1>
      <div className={styles.actions}>
        {basicSessionData && basicSessionData.isLoggedIn ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles['animate-actions']}
            >
              <div>Hello {userData?.firstName || userData?.email}</div>
              <Button variation="outline" onClick={handleLogout}>Logout</Button>
            </motion.div>
          </AnimatePresence>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles['animate-actions']}
            >
              <Button href="/login">Login</Button>
              <Button href="/signup">Sign Up</Button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}