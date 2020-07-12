import axios from 'axios';

const oracleApiUrl = 'http://localhost';
const oracleApiPort = 8081;

const _getDragonsFromOracle = async () => {
  return axios.get(`${oracleApiUrl}:${oracleApiPort}/api/dragons`).then(res => res);
};

export {
  _getDragonsFromOracle,
};
