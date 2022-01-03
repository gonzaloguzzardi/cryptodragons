import axios from 'axios'

const oracleApiUrl = 'http://localhost'
const oracleApiPort = 8081

const getSidechainData = async (mainchainAccountId) =>
  axios
    .get(
      `${oracleApiUrl}:${oracleApiPort}/api/getOrCreateSideAccount?account=${mainchainAccountId}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(`Error fetching sidechain data: ${err}`))

const getDragonsFromOracleAPI = async () =>
  axios
    .get(
      `${oracleApiUrl}:${oracleApiPort}/api/dragons`
    )
    .then((res) => res.data)
    .catch((err) => console.log(`Error fetching sidechain data: ${err}`))


export { getDragonsFromOracleAPI, getSidechainData }
