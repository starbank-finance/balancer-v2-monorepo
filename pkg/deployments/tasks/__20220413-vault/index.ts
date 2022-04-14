import Task from '../../src/task';
import { TaskRunOptions } from '../../src/types';
import { ProtocolFeesCollectorDeployment } from './input';
import { actionId } from '@balancer-labs/v2-helpers/src/models/misc/actions';
import { ethers } from 'hardhat';
import { Contract } from 'ethers';
import VaultAbit from '../20210418-vault/abi/Vault.json';

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as ProtocolFeesCollectorDeployment;

  const args = [input.Vault, input.Authorizer];

  const vault = await ethers.getContractAt(VaultAbit, input.Vault);
  console.log('vault.setPaused');
  await (await vault.setPaused(false)).wait();
  console.log('vault.end');
};
