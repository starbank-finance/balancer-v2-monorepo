import dotenv from 'dotenv';
dotenv.config();
const { PRIVATE_KEY } = process.env;

import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-local-networks-config-plugin';

import '@balancer-labs/v2-common/setupTests';

import { task, types } from 'hardhat/config';
import { TASK_TEST } from 'hardhat/builtin-tasks/task-names';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

import test from './src/test';
import Task from './src/task';
import Verifier from './src/verifier';
import { Logger } from './src/logger';

task('deploy', 'Run deployment task')
  .addParam('id', 'Deployment task ID')
  .addFlag('force', 'Ignore previous deployments')
  .addOptionalParam('key', 'Etherscan API key to verify contracts')
  .setAction(
    async (args: { id: string; force?: boolean; key?: string; verbose?: boolean }, hre: HardhatRuntimeEnvironment) => {
      Logger.setDefaults(false, args.verbose || false);
      const verifier = args.key ? new Verifier(hre.network, args.key) : undefined;
      await Task.fromHRE(args.id, hre, verifier).run(args);
    }
  );

task('verify-contract', 'Run verification for a given contract')
  .addParam('id', 'Deployment task ID')
  .addParam('name', 'Contract name')
  .addParam('address', 'Contract address')
  .addParam('args', 'ABI-encoded constructor arguments')
  .addParam('key', 'Etherscan API key to verify contracts')
  .setAction(
    async (
      args: { id: string; name: string; address: string; key: string; args: string; verbose?: boolean },
      hre: HardhatRuntimeEnvironment
    ) => {
      Logger.setDefaults(false, args.verbose || false);
      const verifier = args.key ? new Verifier(hre.network, args.key) : undefined;

      await Task.fromHRE(args.id, hre, verifier).verify(args.name, args.address, args.args);
    }
  );

task(TASK_TEST)
  .addOptionalParam('fork', 'Optional network name to be forked block number to fork in case of running fork tests.')
  .addOptionalParam('blockNumber', 'Optional block number to fork in case of running fork tests.', undefined, types.int)
  .setAction(test);

export default {
  mocha: {
    timeout: 40000,
  },
  defaultNetwork: 'astar',
  networks: {
    opera: {
      url: 'https://rpc.ftm.tools',
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 250,
      gasPrice: 'auto',
      live: true,
      gasMultiplier: 2,
      saveDeployments: true,
    },

    astar: {
      url: 'https://rpc.astar.network:8545',
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 592,
      gasPrice: 'auto',
      live: true,
      gasMultiplier: 2,
      saveDeployments: true,
    },
    polygon: {
      url: 'https://polygon-rpc.com/',
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 137,
      gasPrice: 'auto',
      live: true,
      gasMultiplier: 2,
      saveDeployments: true,
    },
    astar2: {
      url: 'https://rpc.astar.network:8545',
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 592,
      gasPrice: 'auto',
      live: true,
      gasMultiplier: 2,
      saveDeployments: true,
    },

    harmony: {
      url: 'https://api.harmony.one',
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 1666600000,
      // https://docs.harmony.one/home/network/wallets/browser-extensions-wallets/metamask-wallet
      // https://explorer.harmony.one/
      live: true,
      saveDeployments: true,
      // gasMultiplier: 2,
      gas: 12000000,
      timeout: 1800000,
      allowUnlimitedContractSize: true,
      blockGasLimit: 0x1fffffffffffff,
    },
    fantom: {
      url: 'https://rpc.ftm.tools/',
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 250,
      live: true,
      saveDeployments: true,
      // gasPrice: 600000000000, // 600Gwei
      // gas: 12000000,
      // timeout: 1800000,
      // gasPrice: 42000000000,
    },
    fantomtest: {
      url: 'https://rpc.testnet.fantom.network',
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 4002,
      live: true,
      saveDeployments: true,
    },
    harmonytest: {
      url: 'https://api.s0.b.hmny.io',
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 1666700000,
      // https://explorer.pops.one/
      live: true,
      saveDeployments: true,
      // gasMultiplier: 2,
      gas: 12000000,
      timeout: 1800000,
      allowUnlimitedContractSize: true,
      blockGasLimit: 0x1fffffffffffff,
    },
    auroratest: {
      url: 'https://testnet.aurora.dev/',
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 1313161555, // ( 0x4e454153 )
      live: true,
      saveDeployments: true,
      // gasMultiplier: 2,
      gas: 12000000,
      timeout: 1800000,
      allowUnlimitedContractSize: true,
      blockGasLimit: 0x1fffffffffffff,
    },
    aurora: {
      url: 'https://mainnet.aurora.dev',
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 1313161554, // (0x4e454152)
      //https://explorer.mainnet.aurora.dev/
      live: true,
      saveDeployments: true,
      // gasMultiplier: 2,
      gas: 12000000,
      timeout: 1800000,
      allowUnlimitedContractSize: true,
      blockGasLimit: 0x1fffffffffffff,
    },
    avalanche: {
      chainId: 43114,
      url: 'https://api.avax.network/ext/bc/C/rpc',
      accounts: [`0x${PRIVATE_KEY}`],
      live: true,
      saveDeployments: true,
    },
    xdai: {
      url: 'https://rpc.xdaichain.com',
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 100,
      live: true,
      saveDeployments: true,
    },
    bsc: {
      url: 'https://bsc-dataseed.binance.org',
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 56,
      live: true,
      saveDeployments: true,
    },
    bsc_testnet: {
      url: 'https://data-seed-prebsc-2-s3.binance.org:8545',
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 97,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
  },
};
