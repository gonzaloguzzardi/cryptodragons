import { ReactElement } from 'react'
import Typography from '@material-ui/core/Typography'

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
