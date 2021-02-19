import React, { ReactElement, useState } from 'react'

import { withAccountsHOC } from '../../hooks/accounts-context'

import AppToolbar from '../../components/app-toolbar'
import LandingSection from '../../components/home/landing-section/mobile'
import BuyADragonSection from '../../components/home/buy-a-dragon/mobile'
import MarketplaceSection from '../../components/home/marketplace/mobile'
import GuidesSection from '../../components/home/guides/mobile'
import FooterMobile from '../../components/footer/mobile'

import isChromeBrowser from '../../utils/is-chrome-browser'

import Modal from '../../components/modals'

function HomeMobile({ accountsState }): ReactElement {
  console.log('Account state', accountsState)

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
        deviceType="mobile"
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
      <FooterMobile />
    </>
  )
}

export default withAccountsHOC(HomeMobile)
