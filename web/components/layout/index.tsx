import { ReactNode, ReactElement } from 'react'
import Head from 'next/head'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import PageContainer from 'components/page-container'
import theme from './theme'

import styles from './layout.module.scss'

export const siteTitle = 'CryptoDragons'

interface LayoutProps {
  children?: ReactNode
}

export default function Layout({ children }: LayoutProps): ReactElement {
  return (
    <div className={styles.container}>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="CryptoDragons" />
        <meta name="og:title" content={siteTitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content={theme.palette.primary.main} />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main><PageContainer children={children} /></main>
      </ThemeProvider>
    </div>
  )
}
