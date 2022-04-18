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
 provider_installed &
 mainchain_account &
 sidechain_account &
 sidechain_priv_key &
 sidechain_new_account &
 mapped_accounts &
 connectToProvider()
*/

import React, { createContext, ReactElement, ReactNode, useEffect, useState } from 'react'

import MainchainAPI from '../services/blockchain-interaction/mainchain'
import SidechainAPI from '../services/blockchain-interaction/sidechain'

const getDisplayName = (Component): string => Component.displayName || Component.name || 'Component'

const AccountsContext = createContext({})

AccountsContext.displayName = 'AccountsContext'

const fetchAndSetAllAccountsData = (mainchainData, setData): void => {
  setData({ loading: false })

  if (!mainchainData) return
  setData({
    provider_installed: true,
    mainchain_account: mainchainData.account,
  })

  if (!mainchainData.account) return
  SidechainAPI.fetchSidechainData(mainchainData.account).then((sidechainData) => {
    if (!sidechainData) return
    setData((prevData) => ({
      ...prevData,
      sidechain_account: sidechainData.sideAccount,
      sidechain_priv_key: sidechainData.sidePrivateKey,
      sidechain_new_account: sidechainData.isFirst,
      loading: false,
    }))

    MainchainAPI.areAccountsMapped(sidechainData.sideAccount, 45000).then((res) => {
      setData((prevData) => ({
        ...prevData,
        mapped_accounts: res,
        loading: false,
      }))
    })
  })
}

const AccountsProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [data, setData] = useState({
    loading: true,
    mainchain_account: null,
    provider_installed: false,
  })

  const connectToProvider = (): void => {
    MainchainAPI.connectToProvider()
      .then((mainchainData) => fetchAndSetAllAccountsData(mainchainData, setData))
      .catch((err) => console.error('Connect provider error:', err))
  }

  const updateAccountsData = () => {
    MainchainAPI.getClientHelper().then((mainchainData) =>
      fetchAndSetAllAccountsData(mainchainData, setData)
    )
  }

  useEffect(() => {
    updateAccountsData()
  }, [])

  const store = {
    ...data,
    connectToProvider,
    updateAccountsData,
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
