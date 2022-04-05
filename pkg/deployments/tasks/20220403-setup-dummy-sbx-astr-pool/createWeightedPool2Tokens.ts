import { ethers } from 'hardhat';
import WeightedPool2TokensFactory from '@balancer-labs/v2-deployments/tasks/20210418-weighted-pool/abi/WeightedPool2TokensFactory.json';
import WeightedPool2TokensFactoryBuildInfo from '@balancer-labs/v2-deployments/tasks/20210418-weighted-pool/build-info/WeightedPool2TokensFactory.json';
import { ZERO_ADDRESS } from '@balancer-labs/v2-helpers/src/constants';
import WeightedPool2Tokens from '@balancer-labs/v2-deployments/tasks/20210418-weighted-pool/abi/WeightedPool2Tokens.json';
import { BigNumber } from 'ethers';
import {
  getAbiEncodedConstructorArguments,
  getBufferPeriodDuration,
  getDeployedPoolData,
  getPauseWindowDurationForPool,
  getPoolAddressAndBlockHashFromTransaction,
  getTaskOutputFile,
  getVaultAddress,
  hasPoolBeenDeployed,
  hasPoolBeenInitialized,
  hasPoolBeenVerified,
  joinPool,
  savePoolDeployment,
  setDeployedPoolAsInitialized,
  setDeployedPoolAsVerified,
  verifyPool,
} from './helpers';
import { BuildInfo } from 'hardhat/types';
import Vault from '@balancer-labs/v2-deployments/tasks/20210418-vault/abi/Vault.json';
import logger from '@balancer-labs/v2-deployments/src/logger';

interface CreateWeightedPool2TokensParams {
  name: string;
  symbol: string;
  tokens: string[];
  weights: BigNumber[];
  initialBalances: BigNumber[];
  swapFeePercentage: BigNumber;
  oracleEnabled: boolean;
  owner?: string;
  etherscanApiKey: string;
}

export async function createWeightedPool2Tokens(params: CreateWeightedPool2TokensParams): Promise<void> {
  const { name, symbol, tokens, weights, swapFeePercentage, owner, initialBalances, oracleEnabled } = params;
  const weightedPoolFactoryAddress = getTaskOutputFile('20210418-weighted-pool').WeightedPool2TokensFactory;
  const vaultAddress = await getVaultAddress();
  console.log('vaultAddress: ', vaultAddress);
  console.log('weightedPoolFactoryAddress: ', weightedPoolFactoryAddress);
  const vault = await ethers.getContractAt(Vault, vaultAddress);
  const factory = await ethers.getContractAt(WeightedPool2TokensFactory, weightedPoolFactoryAddress);
  console.log('createWeightedPool2Tokens: ', symbol);
  if (!hasPoolBeenDeployed(symbol)) {
    console.log('Calling create on the WeightedPool2TokensFactory...');
    try {
      const tx = await factory.create(
        name,
        symbol,
        tokens,
        weights,
        swapFeePercentage,
        oracleEnabled,
        owner || ZERO_ADDRESS
      );

      const { poolAddress, blockHash } = await getPoolAddressAndBlockHashFromTransaction(tx);
      const pool = await ethers.getContractAt(WeightedPool2Tokens, poolAddress);
      const poolId = await pool.getPoolId();
      // console.log('poolId:', poolId);
      console.log(`Successfully deployed the WeightedPool2Tokens at address ${poolAddress} with id ${poolId}`);
      logger.info(`Pool deployment block hash: ${blockHash}`);

      savePoolDeployment(symbol, poolAddress, poolId, blockHash, { ...params });
    } catch (e) {
      console.log(e);
    }
  }
  // console.log('createWeightedPool2Tokens');

  const poolData = getDeployedPoolData(symbol);

  // if (poolData && !hasPoolBeenVerified(symbol)) {
  //   await verifyWeightedPool2Tokens({
  //     ...params,
  //     poolAddress: poolData.address,
  //     blockHash: poolData.blockHash,
  //   });

  //   setDeployedPoolAsVerified(symbol);
  // }

  if (poolData && !hasPoolBeenInitialized(symbol)) {
    await joinPool({
      vault,
      poolId: poolData.id,
      tokens,
      initialBalances,
    });

    setDeployedPoolAsInitialized(symbol);
  }
}

async function verifyWeightedPool2Tokens({
  name,
  symbol,
  tokens,
  weights,
  swapFeePercentage,
  owner,
  poolAddress,
  blockHash,
  oracleEnabled,
  etherscanApiKey,
}: CreateWeightedPool2TokensParams & { poolAddress: string; blockHash: string }) {
  const vaultAddress = getVaultAddress();
  const pool = await ethers.getContractAt(WeightedPool2Tokens, poolAddress);
  const pauseWindowDuration = await getPauseWindowDurationForPool(pool, blockHash);
  const bufferPeriodDuration = getBufferPeriodDuration();
  const values = {
    vaultAddress,
    name,
    symbol,
    token0: tokens[0],
    token1: tokens[1],
    normalizedWeight0: weights[0],
    normalizedWeight1: weights[1],
    swapFeePercentage,
    pauseWindowDuration,
    bufferPeriodDuration,
    oracleEnabled,
    owner: owner || ZERO_ADDRESS,
  };

  const formatted = Object.values(values);

  for (const key of Object.keys(values)) {
    // Here we construct the madness that is required to encode a tuple argument
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    formatted[key] = values[key];
  }

  const valueToEncode = [formatted];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  valueToEncode.params = formatted;

  const abiEncodedConstructorArguments = getAbiEncodedConstructorArguments(WeightedPool2Tokens, valueToEncode);

  await verifyPool({
    contractName: 'WeightedPool2Tokens',
    poolAddress,
    abiEncodedConstructorArguments,
    buildInfo: WeightedPool2TokensFactoryBuildInfo as BuildInfo,
    etherscanApiKey,
  });
}
