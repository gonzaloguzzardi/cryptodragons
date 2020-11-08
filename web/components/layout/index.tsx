import Head from 'next/head';

import styles from './layout.module.scss';

export const siteTitle = 'CryptoDragons';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="CryptoDragons" />
        <meta name="og:title" content={siteTitle} />
      </Head>

      <main>{children}</main>

    </div>
  )
}
