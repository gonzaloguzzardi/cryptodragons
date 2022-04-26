import Alert from '@mui/material/Alert'
import AppBar from '@mui/material/AppBar'
import Fab from '@mui/material/Fab'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import { Link as LinkComponent } from '@mui/material'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import PetsIcon from '@mui/icons-material/Pets'
import StorefrontIcon from '@mui/icons-material/Storefront'
import Toolbar from '@mui/material/Toolbar'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Theme, createStyles } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Zoom from '@mui/material/Zoom'
import Avatar from '@mui/material/Avatar'

import MainchainAPI from '../../services/blockchain-interaction/mainchain'
import SidechainAPI from '../../services/blockchain-interaction/sidechain'
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

function ScrollTop({ children }: { children?: ReactElement }): ReactElement {
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
    loading: boolean
    mainchain_account: string
    sidechain_account: string
    sidechain_priv_key: string
    sidechain_new_account: string
    mapped_accounts: boolean
    provider_installed: boolean
    updateAccountsData: () => void
  }
  deviceType: deviceType
  section: 'home' | 'my-dragons' | 'marketplace' | 'guides'
}

export default function AppToolbar({ accountsState, deviceType, section }: IProps): ReactElement {
  const [modalState, setModalState] = useState({ open: false, type: null })
  const [loadingState, setLoadingState] = useState(false)

  function onConnectMetamask(accountsState): void {
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

  const mapAccounts: (event, accountsState) => unknown = () => {
    event.preventDefault()
    onConnectMetamask(accountsState)
    setLoadingState(true)

    Promise.all([
      MainchainAPI.mapAccountToSidechainAccount(accountsState.sidechain_account),
      SidechainAPI.mapAccountToMainchainAccount(accountsState.mainchain_account),
    ])
      .then((values) => {
        console.log('[MAINCHAIN]: MAPEO EN MAINCHAIN', values[0])
        console.log('[SIDECHAIN]: MAPEO EN SIDECHAIN', values[1])
        accountsState.updateAccountsData()
      })
      .finally(() => {
        setInterval(() => setLoadingState(false), 1500)
      })
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          <Link href="/">
            <a className={appbarStyles.homeIconLabelAnchor}>
              <Avatar variant="square" alt="CryptoDragons Icon" src="/assets/dragonsito.jpg" />
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
              device={deviceType}
              loading={accountsState.loading}
              mainchain_account={accountsState.mainchain_account}
              mapped_accounts={accountsState.mapped_accounts}
              onClickStart={() => onConnectMetamask(accountsState)}
              sidechain_account={accountsState.sidechain_account}
              sidechain_priv_key={accountsState.sidechain_priv_key}
              sidechain_new_account={accountsState.sidechain_new_account}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />

      {section === 'my-dragons' &&
        accountsState &&
        !accountsState.mapped_accounts &&
        !loadingState && (
          <Alert severity="warning">
            {
              'You need to map your Mainchain & Sidechain accounts before being able to transfer your CryptoDragons between them!  '
            }
            <LinkComponent
              href="#"
              color="secondary"
              onClick={(e) => mapAccounts(e, accountsState)}
            >
              {'Map Accounts'}
            </LinkComponent>
          </Alert>
        )}

      {loadingState && <LinearProgress color="secondary" />}

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
