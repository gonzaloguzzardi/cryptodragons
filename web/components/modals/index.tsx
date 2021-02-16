import GenericModal from './generic-modal'

export const PROVIDER_MISSING = 'provider_missing'
export const USER_NOT_REGISTERED = 'user_not_registered'

type tProps = {
  handleClose: () => void
  open: boolean
  type: 'PROVIDER_MISSING' | 'USER_NOT_REGISTERED'
}

export default function Modal({ handleClose, open, type }: tProps) {
  if (type === 'PROVIDER_MISSING')
    return (
      <GenericModal open={open} handleClose={handleClose}>
        INSTALL METAMASK MODAL
      </GenericModal>
    )

  return null
}
