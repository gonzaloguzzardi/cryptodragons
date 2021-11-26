import { ReactElement, useState } from 'react'
import Alert from '@material-ui/lab/Alert'
import AppBar from '@material-ui/core/AppBar'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Link as LinkComponent } from '@material-ui/core'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import PetsIcon from '@material-ui/icons/Pets'
import StorefrontIcon from '@material-ui/icons/Storefront'
import Toolbar from '@material-ui/core/Toolbar'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Zoom from '@material-ui/core/Zoom'
import Avatar from '@material-ui/core/Avatar'

import MainchainAPI from '../../services/blockchain-interaction/mainchain'
import SidechainAPI from '../../services/blockchain-interaction/sidechain'
import SessionComponent from './session-component'
import Modal from '../../components/modals'

import isChromeBrowser from '../../utils/is-chrome-browser'

import classnames from 'classnames'

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
      <AppBar variant="outlined">
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
              mainchain_account={accountsState && accountsState.mainchain_account}
              sidechain_account={accountsState && accountsState.sidechain_account}
              sidechain_priv_key={accountsState && accountsState.sidechain_priv_key}
              sidechain_new_account={accountsState && accountsState.sidechain_new_account}
              mapped_accounts={accountsState && accountsState.mapped_accounts}
              device={deviceType}
              onClickStart={() => onConnectMetamask(accountsState)}
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
