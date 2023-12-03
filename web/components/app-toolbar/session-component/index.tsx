import { ReactElement, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Popover from '@mui/material/Popover'
import styles from './index.module.scss'

import deviceType from 'types/device-types'

type tProps = {
  device: deviceType
  loading: boolean
  mainchain_account: string
  mapped_accounts: boolean
  onClickStart: () => void
  sidechain_account: string
  sidechain_new_account: string
  sidechain_priv_key: string
}

export default function SessionComponent({
  device,
  loading,
  mainchain_account,
  mapped_accounts,
  onClickStart,
  sidechain_account,
  sidechain_new_account,
  sidechain_priv_key,
}: tProps): ReactElement {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>
  ): void => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = (): void => {
    setAnchorEl(null)
  }

  const handleTogglePopover = (
    event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>
  ): void => {
    anchorEl === null ? handlePopoverOpen(event) : handlePopoverClose()
  }

  const open = Boolean(anchorEl)

  if (loading)
    return (
      <Typography>
        Loading...
      </Typography>
    )

  if (!mainchain_account)
    return (
      <Button variant="contained" color="secondary" onClick={onClickStart}>
        Start
      </Button>
    )

  return (
    <>
      <div
        className={styles.accountCard}
        onMouseEnter={(e) => (device === 'mobile' ? false : handlePopoverOpen(e))}
        onMouseLeave={handlePopoverClose}
        onClick={(e) => (device === 'desktop' ? false : handleTogglePopover(e))}
        onKeyDown={(e) => device === 'mobile' && e.key === 'Enter' && handleTogglePopover(e)}
        role="button"
        tabIndex={0}
      >
        <Avatar alt={'User'} sx={{ bgcolor: '#88f' }}>
         <AccountCircleIcon />
        </Avatar>
        <Typography variant="body1" className={styles.accountName}>
          User
        </Typography>
        <ArrowDropDownIcon />

        <Popover
          id="mouse-over-popover"
          className={styles.popover}
          classes={{
            paper: styles.paper,
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography>
            <b>Mainchain account:</b> {'' + mainchain_account}
          </Typography>
          <Typography>
            <b>Sidechain account:</b> {'' + sidechain_account}
          </Typography>
          <Typography>
            <b>Sidechain priv key:</b> {'' + sidechain_priv_key}
          </Typography>
          <Typography>
            <b>Sidechain new account:</b> {'' + sidechain_new_account}
          </Typography>
          <Typography>
            <b>Mapped accounts:</b> {'' + mapped_accounts}
          </Typography>
        </Popover>
      </div>
    </>
  )
}
