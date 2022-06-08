import React, { ReactElement } from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import ErrorLabel from '../error/label'

import styles from './desktop.module.scss'

interface State {
  password: string
  showPassword: boolean
  username: string
}

interface Props {
  error: any
  loading: boolean
  submitHandler: any
}

function AdminLoginDesktop({ error, loading, submitHandler }: Props): ReactElement {
  const [values, setValues] = React.useState<State>({
    password: '',
    showPassword: false,
    username: '',
  })

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = (): void => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
  }

  return (
    <form
      onSubmit={(e) => submitHandler(e, values.username, values.password)}
      className={styles.root}
    >
      <Card raised>
        <div className={styles.container}>
          <ErrorLabel message={error} />
          <FormControl className={styles.usernameField} variant="outlined">
            <InputLabel htmlFor="outlined-username">Username</InputLabel>
            <OutlinedInput
              autoComplete="username"
              id="outlined-username"
              value={values.username}
              name="username"
              onChange={handleChange('username')}
            />
          </FormControl>
          <FormControl className={styles.passwordField} variant="outlined">
            <InputLabel htmlFor="outlined-password">Password</InputLabel>
            <OutlinedInput
              autoComplete="current-password"
              id="outlined-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {!loading ? (
            <Button
              variant="contained"
              disabled={!values.username || !values.password}
              classes={{ root: styles.submitButton }}
              size="large"
              type="submit"
            >
              Submit
            </Button>
          ) : (
            <div className={styles.spinnerContainer}>
              <CircularProgress color="primary" />
            </div>
          )}
        </div>
      </Card>
    </form>
  )
}

export default AdminLoginDesktop
