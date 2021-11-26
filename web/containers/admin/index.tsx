import React, { useEffect, useState } from 'react'
import { ReactElement } from 'react'

import { getSessionAdmin } from '../../services/admin'

import { JWT_LS_ID } from '../../constants'

export default function Admin(): ReactElement {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem(JWT_LS_ID)
    getSessionAdmin(token)
      .then((data) => {
        console.log(data)
        setToken(token)
      })
      .catch((err) => {
        console.error('Redirecting', err)
        location.href = '/admin/login'
      })
  }, [])

  return <p>{`Hola, el token es ${token}`}</p>
}
