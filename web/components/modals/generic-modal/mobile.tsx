import React, { ReactElement, ReactNode } from 'react'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import GenericModal from '.'

import styles from './mobile.module.scss'

type tProps = {
  children: ReactNode
  upperRightButtonContent: string | ReactNode
  upperRightButtonHandler: () => void
  handleClose: () => void
  open: boolean
  title: string
}

export default function GenericModalMobile({
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
            <Typography variant="h6">{title}</Typography>
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
