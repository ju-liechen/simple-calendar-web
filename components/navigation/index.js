import styles from './navigation.module.scss'

export const Navigation = () => {
  return (
    <div className={styles['nav-wrapper']}>
      <h1>Simple Calendar App</h1>
      <span>Login</span>
      <span>Sign Up</span>
    </div>
  )
}