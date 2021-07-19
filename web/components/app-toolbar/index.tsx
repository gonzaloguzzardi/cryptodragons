import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import PetsIcon from '@material-ui/icons/Pets'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import StorefrontIcon from '@material-ui/icons/Storefront'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Zoom from '@material-ui/core/Zoom'
import Avatar from '@material-ui/core/Avatar'

import SessionComponent from './session-component'
import Modal from '../../components/modals'

import isChromeBrowser from '../../utils/is-chrome-browser'

import classnames from 'classnames'

import { ReactElement, useState } from 'react'
import Link from 'next/link'

import appbarStyles from './app-toolbar.module.scss'

import deviceType from 'types/device-types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
)

function ScrollTop({ children }: { children: ReactElement }): ReactElement {
  const classes = useStyles()

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    )

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Zoom in={useScrollTrigger()}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  )
}

interface IProps {
  accountsState: {
    mainchain_account: string
    sidechain_account: string
    sidechain_priv_key: string
    sidechain_new_account: string
    mapped_accounts: boolean
    provider_installed: boolean
  }
  deviceType: deviceType
  section: 'home' | 'my-dragons' | 'marketplace' | 'guides'
}

export default function AppToolbar({ accountsState, deviceType, section }: IProps): ReactElement {
  const [modalState, setModalState] = useState({ open: false, type: null })

  function onClickStart(accountsState): void {
    if (!isChromeBrowser()) {
      return setModalState({ open: true, type: 'NOT_CHROME_BROWSER' })
    }

    if (!accountsState.provider_installed) {
      return setModalState({ open: true, type: 'PROVIDER_MISSING' })
    }

    if (accountsState.provider_installed && !accountsState.mainchain_account) {
      return accountsState.connectToProvider()
    }

    if (accountsState.provider_installed && accountsState.mainchain_account) {
      return console.log(
        `Metamask DETECTED, and mainchain_account: ${accountsState.mainchain_account} found.`,
        `Sidechain account: ${accountsState.sidechain_account}, priv key: ${accountsState.sidechain_priv_key}`
      )
    }
  }

  return (
    <>
      <AppBar variant="outlined">
        <Toolbar>
          <Link href="/">
            <a className={appbarStyles.homeIconLabelAnchor}>
              <Avatar alt="CryptoDragons Icon" src="/assets/dragonsito.jpg" />
              {deviceType !== 'mobile' && <h6 className={appbarStyles.homeLabel}>CryptoDragons</h6>}
            </a>
          </Link>

          {/* My dragons */}
          <Link href="/my-dragons">
            <a className={appbarStyles.appbarActionLink} tabIndex={-1}>
              <IconButton
                aria-label="my-dragons"
                className={classnames(appbarStyles.appbarActionLink_Button, {
                  [appbarStyles.appbarActionLink_Button__selected]: section === 'my-dragons',
                })}
              >
                <PetsIcon className={appbarStyles.appbarActionLink_Icon} />
                {deviceType !== 'mobile' && (
                  <span className={appbarStyles.appbarActionLink_Label}>My Dragons</span>
                )}
              </IconButton>
            </a>
          </Link>

          {/* Marketplace */}
          <Link href="/marketplace">
            <a className={appbarStyles.appbarActionLink} tabIndex={-1}>
              <IconButton
                aria-label="marketplace"
                className={classnames(appbarStyles.appbarActionLink_Button, {
                  [appbarStyles.appbarActionLink_Button__selected]: section === 'marketplace',
                })}
              >
                <StorefrontIcon className={appbarStyles.appbarActionLink_Icon} />
                {deviceType !== 'mobile' && (
                  <span className={appbarStyles.appbarActionLink_Label}>Marketplace</span>
                )}
              </IconButton>
            </a>
          </Link>

          {/* Guias */}
          <Link href="/guides">
            <a className={appbarStyles.appbarActionLink} tabIndex={-1}>
              <IconButton
                aria-label="guides"
                className={classnames(appbarStyles.appbarActionLink_Button, {
                  [appbarStyles.appbarActionLink_Button__selected]: section === 'guides',
                })}
              >
                <MenuBookIcon className={appbarStyles.appbarActionLink_Icon} />
                {deviceType !== 'mobile' && (
                  <span className={appbarStyles.appbarActionLink_Label}>Guides</span>
                )}
              </IconButton>
            </a>
          </Link>

          {/* Profile | Sign in/up */}
          <div className={appbarStyles.profileSection}>
            <SessionComponent
              mainchain_account={accountsState && accountsState.mainchain_account}
              sidechain_account={accountsState && accountsState.sidechain_account}
              sidechain_priv_key={accountsState && accountsState.sidechain_priv_key}
              sidechain_new_account={accountsState && accountsState.sidechain_new_account}
              mapped_accounts={accountsState && accountsState.mapped_accounts}
              device={deviceType}
              onClickStart={() => onClickStart(accountsState)}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />

      <ScrollTop>
        <Fab color="secondary" size="large" aria-label="Scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>

      <Modal
        device={deviceType}
        open={modalState.open}
        type={modalState.type}
        handleClose={() => setModalState({ open: false, type: null })}
      />
    </>
  )
}
