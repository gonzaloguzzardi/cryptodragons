import axios from 'axios'

import { oracleApiUrl, oracleApiPort } from '../../../../config'

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = any // @TODO: Type this

export default (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> =>
  axios
    .get(`${oracleApiUrl}:${oracleApiPort}/api/admin/session/test`, { headers: req.headers })
    .then(({ data }) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      console.error(`Error login in: ${err}`)
      res.status(401).send(err)
    })
