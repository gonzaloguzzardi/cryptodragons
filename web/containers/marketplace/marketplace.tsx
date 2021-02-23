import React from 'react'
import { ReactElement } from 'react'

import Layout from '../../components/layout'
import { AccountsProvider } from '../../hooks/accounts-context'

export default function Marketplace({ children }: { children: ReactElement }): ReactElement {
  return (
    <Layout>
      <AccountsProvider>{children}</AccountsProvider>
    </Layout>
  )
}
