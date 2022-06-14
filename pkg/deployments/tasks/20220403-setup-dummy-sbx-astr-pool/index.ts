import { BigNumber } from 'ethers';
import Task from '../../src/task';
import { TaskRunOptions } from '../../src/types';
// import { ProtocolFeesCollector } from './input';
import { createWeightedPool2Tokens } from './createWeightedPool2Tokens';
import { createWeightedPool } from './createWeightedPool';
export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const poolName = 'DUMMY_ASTR';
  const poolSymbol = 'DUMMY_ASTR';
  const tokens = [
    '0x981FF1EF4A1683Af521243DF5Cf84Be505D8C59a', // DUMMY3
    '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720', // WASTR
  ];
  // const weights = [BigNumber.from('200000000000000000'), BigNumber.from('800000000000000000')];
  const weights = [BigNumber.from('800000000000000000'), BigNumber.from('200000000000000000')];
  // const initialBalances = [BigNumber.from('200000000000000000'), BigNumber.from('800000000000000000')];
  const initialBalances = [BigNumber.from('800000000000000000'), BigNumber.from('200000000000000000')];
  // const owner = '0xbef78ca02610f8B4B5E646192e999303d006ED9A'; // Starbank03
  const owner = '0x0000000000000000000000000000000000000000';

  const swapFeePercentage = BigNumber.from('2500000000000000');
  // const swapFeePercentage = BigNumber.from('25000000000000000');

  const a = await createWeightedPool2Tokens({
    name: poolName,
    symbol: poolSymbol,
    tokens: tokens,
    weights: weights,
    initialBalances: initialBalances,
    swapFeePercentage: swapFeePercentage,
    oracleEnabled: true,
    owner: owner,
    etherscanApiKey: '',
  });
  // console.log(a);
  // const input = task.input() as ProtocolFeesCollector;
  // const args = [input.Vault];
  // await task.deployAndVerify('ProtocolFeesCollector', args, from, force);
  // console.log('aaa');
};
