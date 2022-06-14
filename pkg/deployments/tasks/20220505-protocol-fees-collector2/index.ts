// yarn deploy --id 20220505-protocol-fees-collector2 --network astar

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
  console.log('feesCollector: ' + feesCollector.address);
  // const a = await authorizer.DEFAULT_ADMIN_ROLE();
  console.log('authorizer.address: ' + authorizer.address);

  // console.log(
  //   'await actionId(feesCollector, withdrawCollectedFees): ',
  //   await actionId(feesCollector, 'withdrawCollectedFees')
  // );
  // console.log('input.admin: ' + input.admin);
  // await grantRoles(input.admin, [await actionId(feesCollector, 'withdrawCollectedFees')], authorizer);

  // const usdc = '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98';
  // const sdn = '0x75364D4F779d0Bd0facD9a218c67f87dD9Aff3b4';
  // const dai = '0x6De33698e9e9b787e09d3Bd7771ef63557E148bb';
  // await feesCollector.withdrawCollectedFees([usdc, dai, sdn], ['100', '200', '300'], input.admin);
};
