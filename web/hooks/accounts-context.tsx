// dApp UX IMPORTANT
// https://rimble.consensys.design/guides/ux/connect-a-wallet-conditions

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

import React, { createContext, ReactElement, ReactNode, useEffect, useState } from 'react'

import MainchainAPI from '../services/blockchain-interaction/mainchain'

const getDisplayName = (Component): string => Component.displayName || Component.name || 'Component'

const AccountsContext = createContext({})
AccountsContext.displayName = 'AccountsContext'

const AccountsProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [data, setData] = useState({
    provider_installed: null,
    mainchain_account: null,
  })

  useEffect(() => {
    if (!MainchainAPI.providerInstalled()) {
      setData({
        provider_installed: false,
        mainchain_account: null,
      })
    } else {
      MainchainAPI.getClientHelper().then((mainchainData) => {
        setData({
          provider_installed: true,
          mainchain_account: mainchainData && mainchainData.account,
        })
      })
    }
  }, [])

  const store = {
    state: data,
    setState: setData,
  }

  return <AccountsContext.Provider value={store}>{children}</AccountsContext.Provider>
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
