import Task from '../../src/task';

export type ProtocolFeesCollectorDeployment = {
  Vault: string;
  Authorizer: string;
  admin: string;
  operator: string;
};

const Vault = new Task('20210418-vault');
const Authorizer = new Task('20210418-authorizer');

export default {
  astar: {
    Vault,
    Authorizer,
    admin: '0x97f26B0E2d132FA61feF9Ba7A7c6DE456c2df35e',
    operator: '0x97f26B0E2d132FA61feF9Ba7A7c6DE456c2df35e',
  },
  astar2: {
    Vault,
    Authorizer,
    admin: '0xd8d25f59e467c2c224CdEEd9651d6Aec07A2825d',
    operator: '0x79005701874750055f44d2B532380ba8d3a67288',
  },
  opera: {
    Vault,
    Authorizer,
    admin: '0x6eA8D23189aE68F1423c6Fc8f93b602B5C0524A7',
    operator: '0x6eA8D23189aE68F1423c6Fc8f93b602B5C0524A7',
  },
};
