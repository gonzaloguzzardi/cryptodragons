/*
### Use case

const { AccountsProvider, withAccountsHOC } = import('..here..')

const Component1 = import('....')
const ComponentWithAccountData = withAccountsHOC(Component1);

<AccountsProvider>
  <ComponentWithAccountData />
</AccountsProvider>

---
Now ComponentWithAccountData has a prop `accountsState` with the fields
 'state' & 'setState'
 */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { createContext, ReactElement, ReactNode, useState } from 'react'

const getDisplayName = (Component): string => Component.displayName || Component.name || 'Component'

const AccountsContext = createContext({})
AccountsContext.displayName = 'AccountsContext'

const AccountsProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [data, setData] = useState(null)

  const state = {
    state: data,
    setState: setData,
  }

  return <AccountsContext.Provider value={state}>{children}</AccountsContext.Provider>
}

const withAccountsHOC = (Component: any): any => {
  const WithAccounts = (props: any): ReactNode => (
    <AccountsContext.Consumer>
      {(accountsState) => <Component {...props} accountsState={accountsState} />}
    </AccountsContext.Consumer>
  )
  WithAccounts.displayName = `WithAccounts(${getDisplayName(Component)})`
  return WithAccounts
}

export { AccountsProvider, withAccountsHOC }
