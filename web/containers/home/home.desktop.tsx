import React, { ReactElement, useState } from 'react'

import { withAccountsHOC } from '../../hooks/accounts-context'

import AppToolbar from '../../components/app-toolbar'
import LandingSection from '../../components/home/landing-section/desktop'
import BuyADragonSection from '../../components/home/buy-a-dragon/desktop'
import MarketplaceSection from '../../components/home/marketplace/desktop'
import GuidesSection from '../../components/home/guides/desktop'
import FooterDesktop from '../../components/footer/desktop'

import isChromeBrowser from '../../utils/is-chrome-browser'

import Modal from '../../components/modals'

function HomeDesktop({ accountsState }): ReactElement {
  console.log('Account state', JSON.stringify(accountsState, null, 2))

  const [modalState, setModalState] = useState({ open: false, type: null })

  function onClickStart(accountState): void {
    if (!isChromeBrowser()) {
      return setModalState({ open: true, type: 'NOT_CHROME_BROWSER' })
    }

    if (!accountState.provider_installed) {
      return setModalState({ open: true, type: 'PROVIDER_MISSING' })
    }

    if (accountState.provider_installed && !accountState.mainchain_account) {
      return accountState.connectToProvider()
    }

    if (accountState.provider_installed && accountState.mainchain_account) {
      return console.log(`Metamask DETECTED, and account: ${accountState.mainchain_account} found.`)
    }
  }

  return (
    <>
      <AppToolbar
        deviceType="desktop"
        section="home"
        onClickStart={() => onClickStart(accountsState)}
        account={accountsState.mainchain_account}
      />
      <Modal
        open={modalState.open}
        type={modalState.type}
        handleClose={() => setModalState({ open: false, type: null })}
      />
      <LandingSection />
      <BuyADragonSection />
      <MarketplaceSection />
      <GuidesSection />
      <FooterDesktop />
    </>
  )
}

export default withAccountsHOC(HomeDesktop)
