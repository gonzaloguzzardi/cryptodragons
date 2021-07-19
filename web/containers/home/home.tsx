import React from 'react'
import { ReactElement, ReactNode } from 'react'

import { AccountsProvider } from '../../hooks/accounts-context'
import Layout from '../../components/layout'

export default function Home({ children }: { children: ReactNode }): ReactElement {
  return (
    <Layout>
      <AccountsProvider>{children}</AccountsProvider>
    </Layout>
  )
}
