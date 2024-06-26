import { ReactElement } from 'react'

import GenericModalDesktop from './generic-modal/desktop'
import GenericModalMobile from './generic-modal/mobile'

import MetamaskContentDesktop from './contents/metamask-download/desktop'
import MetamaskContentMobile from './contents/metamask-download/mobile'
import DownloadChromeContent from './contents/download-chrome'

import deviceType from 'types/device-types'

export const PROVIDER_MISSING = 'provider_missing'
export const USER_NOT_REGISTERED = 'user_not_registered'

type tProps = {
  device: deviceType
  handleClose: () => void
  open: boolean
  type: 'PROVIDER_MISSING' | 'NOT_CHROME_BROWSER' | 'USER_NOT_REGISTERED'
}

export default function Modal({ device, handleClose, open, type }: tProps): ReactElement {
  if (type === 'PROVIDER_MISSING') {
    return device === 'desktop' ? (
      <GenericModalDesktop
        open={open}
        handleClose={handleClose}
        title={'Wanna play?!'}
        upperRightButtonContent={'Done'}
        upperRightButtonHandler={() => window.location.reload()}
      >
        <MetamaskContentDesktop />
      </GenericModalDesktop>
    ) : (
      <GenericModalMobile
        open={open}
        handleClose={handleClose}
        title={'Wanna play?!'}
        upperRightButtonContent={'Done'}
        upperRightButtonHandler={() => window.location.reload()}
      >
        <MetamaskContentMobile />
      </GenericModalMobile>
    )
  }

  if (type === 'NOT_CHROME_BROWSER') {
    return device === 'desktop' ? (
      <GenericModalDesktop
        open={open}
        handleClose={handleClose}
        title={'You need to use Chrome'}
        upperRightButtonContent={'Done'}
        upperRightButtonHandler={handleClose}
      >
        <DownloadChromeContent />
      </GenericModalDesktop>
    ) : (
      <GenericModalMobile
        open={open}
        handleClose={handleClose}
        title={'You need Chrome'}
        upperRightButtonContent={'Done'}
        upperRightButtonHandler={handleClose}
      >
        <DownloadChromeContent />
      </GenericModalMobile>
    )
  }

  return null
}
