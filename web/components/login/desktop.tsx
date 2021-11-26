import React, { ReactElement } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

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
              id="outlined-username"
              value={values.username}
              name="username"
              onChange={handleChange('username')}
              labelWidth={70}
            />
          </FormControl>
          <FormControl className={styles.passwordField} variant="outlined">
            <InputLabel htmlFor="outlined-password">Password</InputLabel>
            <OutlinedInput
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
              labelWidth={70}
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
