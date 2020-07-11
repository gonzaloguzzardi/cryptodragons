import axios from 'axios';

const oracleApiUrl = 'http://localhost';
const oracleApiPort = 8081;

const _getDragonsFromOracle = async () => {
  return axios.get(`${oracleApiUrl}:${oracleApiPort}/api/dragons`).then(res => res);
};

const _transferDragon = async (_dragonId, _toMain) => {
  return axios.get(`${oracleApiUrl}:${oracleApiPort}/api/dragon/transfer`, {
    params: { id: _dragonId, toMain: _toMain },
  }).then(res => res);
};

const _mapAccounts = async (_mainAccount, _sideAccount) => {
  return axios.get(`${oracleApiUrl}:${oracleApiPort}/api/mapAccounts`, {
    params: { mainAccount: _mainAccount, sideAccount: _sideAccount },
  }).then(res => res);
};

const _accountsAreMapped = async (_mapAccountMain, _mapAccountSide, _mapPrivateAccountSide) => {
  return axios.post(`${oracleApiUrl}:${oracleApiPort}/api/isMap`, { 
    mainAccount: _mapAccountMain, sideAccount: _mapAccountSide, sideprivateAccount: _mapPrivateAccountSide 
  }).then(res => res);
};


export {
  _accountsAreMapped,
  _getDragonsFromOracle,
  _transferDragon,
  _mapAccounts,
};
  