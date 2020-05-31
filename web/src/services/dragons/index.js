import axios from 'axios';
const sidechainApiUrl = 'http://localhost';
const sidechainApiPort = 8001;

const mainchainApiUrl = 'http://localhost';
const mainchainApiPort = 8002;

const oracleApiUrl = 'http://localhost';
const oracleApiPort = 8081;

const _getDragon = async (id, location) => {
    return axios.get(`${oracleApiUrl}:${oracleApiPort}/api/dragon?id=` + id + `&location=` + location ).then(res => res);
};  

const _getDragonsFromMain = async () => {
    return axios.get(`${mainchainApiUrl}:${mainchainApiPort}/api/dragons`).then(res => res.data);
};  

const _getDragonsFromSide = async () => {
    return axios.get(`${sidechainApiUrl}:${sidechainApiPort}/api/dragons`).then(res => res.data);
};  

const _getDragonsFromOracle = async () => {
    return axios.get(`${oracleApiUrl}:${oracleApiPort}/api/dragons`).then(res => res);
};  

const _buyDragonInMainChain = async () => {
    return axios.get(`${mainchainApiUrl}:${mainchainApiPort}/api/dragon/create`).then(res => res);
};  

const _buyDragonInSideChain = async () => {
    return axios.get(`${sidechainApiUrl}:${sidechainApiPort}/api/dragon/create`).then(res => res);
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

const _isMap = async (_mapAccountMain, _mapAccountSide, _mapPrivateAccountSide) => {
    return axios.post(`${oracleApiUrl}:${oracleApiPort}/api/isMap`, { 
        mainAccount: _mapAccountMain, sideAccount: _mapAccountSide, sideprivateAccount: _mapPrivateAccountSide 
    }).then(res => res);
};  


export {
    _isMap,
    _getDragon,
    _getDragonsFromMain,
    _getDragonsFromSide,
    _getDragonsFromOracle,
    _buyDragonInMainChain,
    _buyDragonInSideChain,
    _transferDragon,
    _mapAccounts
  };
  