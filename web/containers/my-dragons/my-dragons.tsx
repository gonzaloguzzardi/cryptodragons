import React, { ReactElement } from 'react'

import { AccountsProvider } from 'hooks/accounts-context'
import Layout from 'components/layout'

export default function MyDragons({ children }: { children: ReactElement }): ReactElement {
  return (
    <Layout>
      <AccountsProvider>{children}</AccountsProvider>
    </Layout>
  )
}
