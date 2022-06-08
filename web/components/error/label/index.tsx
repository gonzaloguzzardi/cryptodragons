import React, { ReactElement } from 'react'
import Typography from '@mui/material/Typography'

interface Props {
  message: string
}

export default function ErrorLabel({ message }: Props): ReactElement {
  if (!message) return null

  return (
    <Typography color="error" align="center" noWrap gutterBottom>
      {message}
    </Typography>
  )
}
