import React, { ReactElement } from 'react'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import Fade from '@mui/material/Fade'

import styles from './index.module.scss'

type tProps = {
  children: ReactElement
  handleClose: () => void
  open: boolean
}

export default function GenericModal({ children, handleClose, open }: tProps): ReactElement {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={styles.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>{children}</Fade>
    </Modal>
  )
}
