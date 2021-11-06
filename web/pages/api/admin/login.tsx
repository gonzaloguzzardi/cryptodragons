import axios, { AxiosResponse } from 'axios'

import { oracleApiUrl, oracleApiPort } from '../../../config'

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  token?: string
  error?: string
}

export default (req: NextApiRequest, res: NextApiResponse<Data>): void => {
  const { username, password } = req.body

  axios
    .post(`${oracleApiUrl}:${oracleApiPort}/api/admin/login`, { username, password })
    .then(({ data }) => {
      res.status(200).json({ token: data.token })
    })
    .catch((err) => {
      console.error(`Error login in: ${err}`)
      res.status(401).send({ error: 'Invalid credentials' })
    })
}
