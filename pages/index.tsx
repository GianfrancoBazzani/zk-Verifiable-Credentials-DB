import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
       <h1>header </h1>
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>
          TITLE
        </h1>
      </main>
    </div>
  )
}

export default Home
