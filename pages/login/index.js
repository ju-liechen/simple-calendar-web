import { useRouter } from 'next/router'
import { Login as LoginForm } from 'components/forms/login'

import styles from './login.module.scss'

const LoginPage = () => {
  const router = useRouter()
  return (
    <div className={styles['login-wrapper']}>
      <h2>Login</h2>
      <LoginForm onSuccess={() => router.push('/')} />
    </div>
  )
}

LoginPage.Layouts = ['BaseLayout']
export default LoginPage
