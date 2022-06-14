import Task from '../../src/task';
import { MONTH } from '@balancer-labs/v2-helpers/src/time';

export type VaultDeployment = {
  Authorizer: string;
  weth: string;
  pauseWindowDuration: number;
  bufferPeriodDuration: number;
};

const Authorizer = new Task('20210418-authorizer');

export default {
  goerli: {
    Authorizer,
    weth: '0xdFCeA9088c8A88A76FF74892C1457C17dfeef9C1',
    pauseWindowDuration: 3 * MONTH,
    bufferPeriodDuration: MONTH,
  },
  kovan: {
    Authorizer,
    weth: '0xdFCeA9088c8A88A76FF74892C1457C17dfeef9C1',
    pauseWindowDuration: 3 * MONTH,
    bufferPeriodDuration: MONTH,
  },
  mainnet: {
    Authorizer,
    weth: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    pauseWindowDuration: 3 * MONTH,
    bufferPeriodDuration: MONTH,
  },
  rinkeby: {
    Authorizer,
    weth: '0xdFCeA9088c8A88A76FF74892C1457C17dfeef9C1',
    pauseWindowDuration: 3 * MONTH,
    bufferPeriodDuration: MONTH,
  },
  ropsten: {
    Authorizer,
    weth: '0xdFCeA9088c8A88A76FF74892C1457C17dfeef9C1',
    pauseWindowDuration: 3 * MONTH,
    bufferPeriodDuration: MONTH,
  },
  polygon: {
    Authorizer,
    weth: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', // WMATIC
    pauseWindowDuration: 3 * MONTH,
    bufferPeriodDuration: MONTH,
  },
  arbitrum: {
    Authorizer,
    weth: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    pauseWindowDuration: 3 * MONTH,
    bufferPeriodDuration: MONTH,
  },
  astar: {
    Authorizer,
    weth: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    pauseWindowDuration: 3 * MONTH,
    bufferPeriodDuration: MONTH,
  },
  astar2: {
    Authorizer,
    weth: '0xEcC867DE9F5090F55908Aaa1352950b9eed390cD',
    pauseWindowDuration: 3 * MONTH,
    bufferPeriodDuration: MONTH,
  },
  note: {
    Authorizer,
    weth: '0xEcC867DE9F5090F55908Aaa1352950b9eed390cD',
    pauseWindowDuration: 7776000,
    bufferPeriodDuration: 2592000,
  },
  opera: {
    Authorizer,
    weth: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', // wftm
    pauseWindowDuration: 0,
    bufferPeriodDuration: 0,
  },

  fantomtest: {
    Authorizer,
    weth: '0x2A9bC7944cb49F446bA8E679eeF4Ecf137A1568f', // WFTM
    pauseWindowDuration: 7776000,
    bufferPeriodDuration: 2592000,
  },

  harmony: {
    Authorizer,
    weth: '0xcf664087a5bb0237a0bad6742852ec6c8d69a27a', // WONE
    pauseWindowDuration: 7776000,
    bufferPeriodDuration: 2592000,
  },

  bsc: {
    Authorizer,
    weth: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // wbnb
    pauseWindowDuration: 7776000,
    bufferPeriodDuration: 2592000,
  },
};
