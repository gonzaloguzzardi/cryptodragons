import React from 'react'
import { ReactElement } from 'react'

import { JWT_LS_ID } from '../../constants'

export default function Admin(): ReactElement {
  let token = ''
  if (typeof window !== 'undefined') {
    token = localStorage.getItem(JWT_LS_ID)
  }

  return <p>{`Hola, el token es ${token}`}</p>
}
