import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Zoom from '@material-ui/core/Zoom'
import Avatar from '@material-ui/core/Avatar'

import { ReactElement } from 'react'
import Link from 'next/link'

import appbarStyles from './app-toolbar.module.scss'

interface IProps {
  children: ReactElement
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
)

function ScrollTop({ children }: IProps): ReactElement {
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

export default function AppToolbar(): ReactElement {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Link href="/">
            <a className={appbarStyles.homeIconLabelAnchor}>
              <Avatar alt="CryptoDragons Icon" src="/assets/dragonsito.jpg" />
              <h6 className={appbarStyles.homeLabel}>CryptoDragons</h6>
            </a>
          </Link>
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
