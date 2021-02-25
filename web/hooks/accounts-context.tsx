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
 'provider_installed' & 'mainchain_account' & 'connectToProvider()'

*/

import React, { createContext, ReactElement, ReactNode, useEffect, useState } from 'react'

import MainchainAPI from '../services/blockchain-interaction/mainchain'
import SidechainAPI from '../services/blockchain-interaction/sidechain'

const getDisplayName = (Component): string => Component.displayName || Component.name || 'Component'

const AccountsContext = createContext({})
AccountsContext.displayName = 'AccountsContext'

const AccountsProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [data, setData] = useState({
    provider_installed: false,
    mainchain_account: null,
  })

  const connectToProvider = (): void => {
    MainchainAPI.connectToProvider()
      .then((mainchainData) => {
        console.log('Connect provider response:', mainchainData)
        if (mainchainData) {
          setData({
            provider_installed: true,
            mainchain_account: mainchainData.account,
          })
          SidechainAPI.fetchSidechainData(mainchainData.account).then((sidechainData) => {
            if (sidechainData)
              setData((prevData) => ({
                ...prevData,
                sidechain_account: sidechainData.sideAccount,
                sidechain_priv_key: sidechainData.sidePrivateKey,
                sidechain_new_account: sidechainData.isFirst,
              }))
          })
        }
      })
      .catch((err) => console.error('Connect provider error:', err))
  }

  useEffect(() => {
    MainchainAPI.getClientHelper().then((mainchainData) => {
      if (mainchainData) {
        setData({
          provider_installed: true,
          mainchain_account: mainchainData.account,
        })
        SidechainAPI.fetchSidechainData(mainchainData.account).then((sidechainData) => {
          if (sidechainData)
            setData((prevData) => ({
              ...prevData,
              sidechain_account: sidechainData.sideAccount,
              sidechain_priv_key: sidechainData.sidePrivateKey,
              sidechain_new_account: sidechainData.isFirst,
            }))
        })
      }
    })
  }, [])

  const store = {
    ...data,
    connectToProvider,
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
