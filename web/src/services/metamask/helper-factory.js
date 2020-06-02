import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

export default async function helperFactory() {
  if (!window.ethereum) return null;
  return Promise.all([
    web3.eth.getAccounts(),
    web3.eth.net.getId(),
  ]).then(values => {
    return {
      account: values[0][0],
      netId: values[1],
    };
  }).catch(err => console.error(err));
};
