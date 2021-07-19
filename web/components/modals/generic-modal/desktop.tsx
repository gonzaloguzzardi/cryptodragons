import React, { ReactElement, ReactNode } from 'react'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import GenericModal from '.'

import styles from './desktop.module.scss'

type tProps = {
  children: ReactNode
  upperRightButtonContent: string | ReactNode
  upperRightButtonHandler: () => void
  handleClose: () => void
  open: boolean
  title: string
}

export default function GenericModalDesktop({
  children,
  upperRightButtonContent,
  upperRightButtonHandler,
  handleClose,
  open,
  title,
}: tProps): ReactElement {
  return (
    <GenericModal handleClose={handleClose} open={open}>
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
    </GenericModal>
  )
}
