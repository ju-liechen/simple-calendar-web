import { useRouter } from 'next/router'
import { Signup as SignupForm } from 'components/forms/signup'

import styles from './signup.module.scss'

const Signup = () => {
  const router = useRouter()
  return (
    <div className={styles['signup-wrapper']}>
      <h2>Signup</h2>
      <SignupForm onSuccess={() => router.push('/')} />
    </div>
  )
}

Signup.Layouts = ['BaseLayout']
export default Signup
