import React, { ReactElement, ReactNode } from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import styles from './desktop.module.scss'
import { Button } from '@material-ui/core'

type tProps = {
  children: ReactNode
  upperRightButtonContent: string | ReactNode
  upperRightButtonHandler: () => void
  handleClose: () => void
  open: boolean
  title: string
}

export default function GenericModal({
  children,
  upperRightButtonContent,
  upperRightButtonHandler,
  handleClose,
  open,
  title,
}: tProps): ReactElement {
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
        <div className={styles.paper}>
          {title && (
            <div className={styles.title}>
              <Typography variant="h5">{title}</Typography>
            </div>
          )}
          {title && <Divider className={styles.divider} />}
          {upperRightButtonContent && (
            <div className={styles.closeButton}>
              <Button variant="outlined" color="secondary" onClick={upperRightButtonHandler}>
                <span className={styles.closeButtonContent}>{upperRightButtonContent}</span>
              </Button>
            </div>
          )}
          {children}
        </div>
      </Fade>
    </Modal>
  )
}
