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
import React, { createContext, ReactElement, ReactNode, useEffect, useState } from 'react'

import MainchainAPI from '../services/blockchain-interaction/mainchain'

const getDisplayName = (Component): string => Component.displayName || Component.name || 'Component'

const AccountsContext = createContext({})
AccountsContext.displayName = 'AccountsContext'

const AccountsProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [data, setData] = useState({
    mainchain_data: null,
    sidechain_data: null,
  })

  const state = {
    state: data,
    setState: setData,
  }

  useEffect(() => {
    Promise.all([MainchainAPI.getClientHelper()]).then(([mainchainData]) => {
      setData({
        mainchain_data: {
          account: mainchainData && mainchainData.account,
          net_id: mainchainData && mainchainData.netId,
        },
        sidechain_data: null,
      })
    })
  }, [])

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
