import { Button } from 'components/button'
import styles from './navigation.module.scss'

export const Navigation = () => {
  return (
    <div className={styles['nav-wrapper']}>
      <h1>Simple Calendar App</h1>
      <div className={styles.actions}>
        <Button>Login</Button>
        <Button>Sign Up</Button>
      </div>
    </div>
  )
}