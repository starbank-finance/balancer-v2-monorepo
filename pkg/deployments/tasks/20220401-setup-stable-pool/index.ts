import { BigNumber } from 'ethers';
import Task from '../../src/task';
import { TaskRunOptions } from '../../src/types';
// import { ProtocolFeesCollector } from './input';
import { createStablePool } from './createStablePool';
export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const poolName = 'USDC-DAI-USDT Stable Pool';
  const poolSymbol = 'StarbankLP_USDC_DAI_USDT';
  const tokens = [
    '0x3795C36e7D12A8c252A20C5a7B455f7c57b60283', //USDT
    '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98', // USDC
    '0x6De33698e9e9b787e09d3Bd7771ef63557E148bb', // DAI
  ];
  const initialBalances = [BigNumber.from('100000'), BigNumber.from('100000'), BigNumber.from('100000000000000000')];
  // console.log(poolName);
  // console.log(poolSymbol);
  // console.log(tokens);
  const aParam = 2000;
  const owner = '0xbef78ca02610f8B4B5E646192e999303d006ED9A'; // Starbank03
  const swapFeePercentage = BigNumber.from('600000000000000');

  const a = await createStablePool({
    name: poolName,
    symbol: poolSymbol,
    tokens: tokens,
    amplificationParameter: aParam,
    initialBalances: initialBalances,
    swapFeePercentage: swapFeePercentage,
    owner: owner,
    etherscanApiKey: '',
  });
  // console.log(a);
  // const input = task.input() as ProtocolFeesCollector;
  // const args = [input.Vault];
  // await task.deployAndVerify('ProtocolFeesCollector', args, from, force);
  // console.log('aaa');
};
