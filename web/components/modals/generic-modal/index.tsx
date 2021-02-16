import React, { ReactNode } from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

import styles from './index.module.scss'

type tProps = {
  children: ReactNode
  handleClose: () => void
  open: boolean
}

export default function GenericModal({ children, handleClose, open }: tProps) {
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
      <Fade in={open}>
        <div className={styles.paper}>{children}</div>
      </Fade>
    </Modal>
  )
}
