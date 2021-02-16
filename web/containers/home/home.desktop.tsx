import React, { ReactElement, useState } from 'react'

import { withAccountsHOC } from '../../hooks/accounts-context'

import AppToolbar from '../../components/app-toolbar'
import LandingSection from '../../components/home/landing-section/desktop'
import BuyADragonSection from '../../components/home/buy-a-dragon/desktop'
import MarketplaceSection from '../../components/home/marketplace/desktop'
import GuidesSection from '../../components/home/guides/desktop'
import FooterDesktop from '../../components/footer/desktop'

import Modal from '../../components/modals'

function HomeDesktop({ accountsState }): ReactElement {
  console.log('Account state', JSON.stringify(accountsState, null, 2))

  const [modalType, setModalType] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  function onClickStart(accountState): void {
    if (!accountState.provider_installed) {
      // User needs provider to connect to mainchain, offer Metamask
      setModalType('PROVIDER_MISSING')
      setModalOpen(true)
    }

    if (accountState.provider_installed && !accountState.mainchain_account) {
      // Should open metamask to connect with account
      console.log('Metamask DETECTED, but no mainchain account found.')
      accountState.connectToProvider()
    }

    if (accountState.provider_installed && accountState.mainchain_account) {
      // Should show users data or create account in app with user data
      console.log(`Metamask DETECTED, and account: ${accountState.mainchain_account} found.`)
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
      <Modal open={modalOpen} type={modalType} handleClose={() => setModalOpen(false)} />
      <LandingSection />
      <BuyADragonSection />
      <MarketplaceSection />
      <GuidesSection />
      <FooterDesktop />
    </>
  )
}

export default withAccountsHOC(HomeDesktop)
