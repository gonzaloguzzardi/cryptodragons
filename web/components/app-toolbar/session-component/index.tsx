import { ReactElement, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Popover from '@material-ui/core/Popover'
import styles from './index.module.scss'

import deviceType from 'types/device-types'

type tProps = {
  account: string
  device: deviceType
  onClickStart: () => void
}

export default function SessionComponent({ account, device, onClickStart }: tProps): ReactElement {
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

  if (!account)
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
        <Avatar alt={'Mocca'} src={'/assets/mocca.jpg'} />
        <Typography variant="body1" className={styles.accountName}>
          Mocca
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
            <b>mainchain account:</b> {account}
          </Typography>
          <Typography>
            <b>sidechain account:</b>&nbsp;&nbsp; ...
          </Typography>
        </Popover>
      </div>
    </>
  )
}
