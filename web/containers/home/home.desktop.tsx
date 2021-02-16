import React, { ReactElement } from 'react'

import { withAccountsHOC } from '../../hooks/accounts-context'

import AppToolbar from '../../components/app-toolbar'
import LandingSection from '../../components/home/landing-section/desktop'
import BuyADragonSection from '../../components/home/buy-a-dragon/desktop'
import MarketplaceSection from '../../components/home/marketplace/desktop'
import GuidesSection from '../../components/home/guides/desktop'
import FooterDesktop from '../../components/footer/desktop'

import Modal from '../../components/modals/generic-modal'

function HomeDesktop({ accountsState }): ReactElement {
  console.log('Account state', JSON.stringify(accountsState, null, 2))

  function onClickStart(accountState): null {
    if (!accountState.state.provider_installed) {
      console.log('Metamask not detected.')
    }

    if (accountState.state.provider_installed && !accountState.state.mainchain_account) {
      console.log('Metamask DETECTED, but no mainchain account found.')
    }

    if (accountState.state.provider_installed && accountState.state.mainchain_account) {
      console.log(`Metamask DETECTED, and account: ${accountState.state.mainchain_account} found.`)
    }

    return null
  }

  return (
    <>
      <AppToolbar
        deviceType="desktop"
        section="home"
        onClickStart={() => onClickStart(accountsState)}
      />
      <Modal open={true}>CONTENIDOOOOOOO</Modal>
      <LandingSection />
      <BuyADragonSection />
      <MarketplaceSection />
      <GuidesSection />
      <FooterDesktop />
    </>
  )
}

export default withAccountsHOC(HomeDesktop)
