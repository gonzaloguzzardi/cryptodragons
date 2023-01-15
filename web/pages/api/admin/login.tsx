import axios from 'axios'

import { oracleApiUrl, oracleApiPort } from 'config'

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  token?: string
  error?: string
}
export default (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  const { username, password } = req.body

  return axios
    .post(`${oracleApiUrl}:${oracleApiPort}/api/admin/login`, { username, password })
    .then(({ data }) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      const errorMessage = error?.response?.data?.message ?? 'Error'
      res.status(401).send(errorMessage)
    })
}
