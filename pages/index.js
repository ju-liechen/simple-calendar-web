import Head from 'next/head'
import Link from 'next/link'

import styles from './index.module.scss'

const Index = () => {
  return (
    <>
      <Head>
        <title>Simple Calendar App</title>
      </Head>
      <div className={styles['home-wrapper']}>
        <div className={styles['pages']}>
          <Link href='/calendar'>Calendar</Link>
          <Link href='/settings'>Profile</Link>
        </div>
      </div>
    </>
  )
}

Index.Layouts = ['BaseLayout']
export default Index