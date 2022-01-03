import React from 'react'
import { ReactElement } from 'react'

import LoginDesktop from '../../components/login/desktop'

import { postLoginData } from '../../services/admin'

import { JWT_LS_ID } from '../../constants'

export default function AdminLogin(): ReactElement {
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const submitHandler = (e, username: string, password: string): void => {
    e.preventDefault()
    setError('')
    setLoading(true)

    postLoginData(username, password)
      .then((res) => {
        localStorage.setItem(JWT_LS_ID, res.token)
        location.href = '/admin'
      })
      .catch(({ message }) => setError(message))
      .finally(() => setLoading(false))
  }

  return <LoginDesktop submitHandler={submitHandler} error={error} loading={loading} />
}
