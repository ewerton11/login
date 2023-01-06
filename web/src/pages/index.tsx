import { RequireAuth } from 'context/auth/requireAuth'
import Head from 'next/head'

import style from '../styles/home/style.module.css'

export default function Home() {
  return (
    <RequireAuth>
      <>
        <Head>
          <title>Login</title>
          <meta name="description" content="Login" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <main className={style.main}>
          <h1>home</h1>
        </main>
      </>
    </RequireAuth>
  )
}
