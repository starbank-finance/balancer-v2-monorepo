import Task from '../../src/task';
import { TaskRunOptions } from '../../src/types';
import { ProtocolFeesCollector } from './input';

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as ProtocolFeesCollector;
  const args = [input.Vault];
  await task.deployAndVerify('ProtocolFeesCollector', args, from, force);
};
