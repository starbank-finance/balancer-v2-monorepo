import Task from '../../src/task';
import { TaskRunOptions } from '../../src/types';
import { ProtocolFeesCollectorDeployment } from './input';
import { actionId } from '@balancer-labs/v2-helpers/src/models/misc/actions';
import { ethers } from 'hardhat';
import { Contract } from 'ethers';
import VaultAbit from '../20210418-vault/abi/Vault.json';
import AuthorizerAbi from '../20210418-authorizer/abi/Authorizer.json';
import { deploy, deployedAt } from '@balancer-labs/v2-helpers/src/contract';
import { arraySub, bn, BigNumberish, min, fp } from '@balancer-labs/v2-helpers/src/numbers';

export async function grantRoles(adminAddress: string, roles: string[], authorizer: Contract) {
  for (const role of roles) {
    console.log('grantRoles.adminAddress: ', adminAddress);
    console.log('grantRoles.role: ', role);
    const tx = await authorizer.grantRole(role, adminAddress);
    const receipt = await tx.wait();
    console.log(receipt);
  }
}
export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as ProtocolFeesCollectorDeployment;
  // const input2 = task.input() as AuthorizerDeployment;
  const args = [input.Vault, input.Authorizer];

  const vault = await ethers.getContractAt(VaultAbit, input.Vault);
  const authorizer = await ethers.getContractAt(AuthorizerAbi, input.Authorizer);
  console.log('await vault.getProtocolFeesCollector(): ', await vault.getProtocolFeesCollector());
  console.log('args: ', args);
  const protocolFeeCollectorAddress = await vault.getProtocolFeesCollector();
  const feesCollector = await deployedAt('ProtocolFeesCollector', protocolFeeCollectorAddress);
  // const a = await authorizer.DEFAULT_ADMIN_ROLE();

  await grantRoles(input.admin, [await authorizer.DEFAULT_ADMIN_ROLE()], authorizer);

  // console.log('await authorizer.DEFAULT_ADMIN_ROLE(): ', await authorizer.DEFAULT_ADMIN_ROLE());
  // console.log(
  //   'await actionId(feesCollector, setFlashLoanFeePercentage): ',
  //   await actionId(feesCollector, 'setFlashLoanFeePercentage')
  // );
  // console.log(
  //   'await actionId(feesCollector, setSwapFeePercentage): ',
  //   await actionId(feesCollector, 'setSwapFeePercentage')
  // );
  // console.log(
  //   'await actionId(feesCollector, setSwapFeePercentage): ',
  //   await actionId(feesCollector, 'setSwapFeePercentage ')
  // );
  // console.log('await actionId(vault, setPaused): ', await actionId(vault, 'setPaused '));

  await grantRoles(
    // config.adminAddress,
    input.admin,
    [
      await actionId(feesCollector, 'setFlashLoanFeePercentage'),
      await actionId(feesCollector, 'setSwapFeePercentage '),
      await actionId(feesCollector, 'setSwapFeePercentage '),
      await actionId(vault, 'setPaused'),
    ],
    authorizer
  );

  // fee collector (withdraw fees)
  await grantRoles(protocolFeeCollectorAddress, [await actionId(feesCollector, 'withdrawCollectedFees')], authorizer);

  // // // await task.deployAndVerify('ProtocolFeesCollector', args, from, force);
  // // const action = await actionId(feesCollector, 'setSwapFeePercentage');
  // // console.log('action: ', action);
  // // console.log('feesCollector: ', feesCollector.address);

  // // await feesCollector.connect(admin).setSwapFeePercentage(SWAP_FEE_PERCENTAGE);
  // await feesCollector.setSwapFeePercentage(SWAP_FEE_PERCENTAGE);

  // // await authorizer.grantPermissions([action], input.admin, [input.operator]);
  // // await authorizer.grantPermissions([action], input.admin, [input.operator]);
  console.log('fp(0.2): ', fp(0.2).toString());
  console.log('setSwapFeePercentage');
  await feesCollector.setSwapFeePercentage(fp(0.2));

  console.log('setFlashLoanFeePercentage');
  // await feesCollector.setFlashLoanFeePercentage('1000000000000000'); // fp(0.001) ?
  await feesCollector.setFlashLoanFeePercentage(fp(0.1)); // fp(0.001) ?

  // await feesCollector.setSwapFeePercentage(fp(0.1));
};
