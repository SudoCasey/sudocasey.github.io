import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import CookieClicker from './cookieClicker/cookieClicker.js'


export default function Home() {
  return (
    <>
      <Head>
        <title>Cookie Clicker</title>
        <meta name="description" content="Cookie Clicker NextJS app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
      <CookieClicker />
      </main>
    </>
  )
}
