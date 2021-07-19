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

export { getSidechainData }
