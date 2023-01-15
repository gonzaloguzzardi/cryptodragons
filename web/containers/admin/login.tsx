import React, { ReactElement } from 'react'

import Layout from 'components/layout'
import LoginDesktop from 'components/login/desktop'

import { postLoginData } from 'services/admin'

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
      .catch(({ message }) => {
        setError(message)
        setLoading(false)
      })
  }

  return (
    <Layout>
      <LoginDesktop submitHandler={submitHandler} error={error} loading={loading} />
    </Layout>
  )
}
