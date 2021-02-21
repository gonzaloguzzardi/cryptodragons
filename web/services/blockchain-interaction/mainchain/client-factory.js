/* eslint-disable no-undef */
import detectEthereumProvider from '@metamask/detect-provider'

export default async function clientFactory() {
  const provider = await detectEthereumProvider()

  if (!provider) {
    console.log('Provider(ej: Metamask) not found')
    return Promise.resolve(null)
  }

  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?')
  }

  return Promise.all([
    ethereum.request({ method: 'eth_accounts' }),
    ethereum.request({ method: 'eth_chainId' }),
  ])
    .then((values) => ({
      account: values[0][0],
      chainId: values[1],
    }))
    .catch((err) => console.error(err))
}
