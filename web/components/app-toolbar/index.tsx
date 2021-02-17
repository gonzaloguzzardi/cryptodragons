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

import classnames from 'classnames'

import { ReactElement } from 'react'
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
  account: string
  deviceType: deviceType
  section: 'home' | 'my-dragons' | 'marketplace' | 'guides'
  onClickStart: () => void
}

export default function AppToolbar({
  account,
  deviceType,
  section,
  onClickStart,
}: IProps): ReactElement {
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
            <a className={appbarStyles.appbarActionLink}>
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
            <a className={appbarStyles.appbarActionLink}>
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
            <a className={appbarStyles.appbarActionLink}>
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
            <SessionComponent account={account} onClickStart={onClickStart} />
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />

      <ScrollTop>
        <Fab color="secondary" size="large" aria-label="Scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  )
}
