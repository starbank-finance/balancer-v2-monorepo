# <img src="../../logo.svg" alt="Balancer" height="128px">

# Balancer V2 Deployments

[![NPM Package](https://img.shields.io/npm/v/@balancer-labs/v2-deployments.svg)](https://www.npmjs.org/package/@balancer-labs/v2-deployments)
[![GitHub Repository](https://img.shields.io/badge/github-deployments-lightgrey?logo=github)](https://github.com/balancer-labs/balancer-v2-monorepo/tree/deployments-latest/pkg/deployments)

This package contains the addresses and ABIs of all Balancer V2 deployed contracts, for Ethereum, Polygon and Arbitrum mainnet, as well as various test networks. Each deployment consists of a deployment script (called 'task'), inputs (script configuration, such as dependencies), outputs (typically contract addresses), and ABIs of related contracts.

Addresses and ABIs can be used consumed from the package in JavaScript environments, or manually retrieved from the [GitHub](https://github.com/balancer-labs/balancer-v2-monorepo/tree/deployments-latest/pkg/deployments) repository.

Note that some protocol contracts are created dynamically: for example, `WeightedPool` contracts are deployed by the canonical `WeightedPoolFactory`. While the ABIs of these contracts are stored in the `abi` directory of each deployment, their addresses are not. Those can be retrieved by querying the on-chain state or processing emitted events.

## Overview

### Installation

```console
$ npm install @balancer-labs/v2-deployments
```

### Usage

Import `@balancer-labs/v2-deployments` to access the different ABIs and deployed addresses. To see all Task IDs and their associated contracts, head to [Past Deployments](#past-deployments).

---

- **async function getBalancerContract(taskID, contract, network)**

Returns an [Ethers](https://docs.ethers.io/v5/) contract object for a canonical deployment (e.g. the Vault, or a Pool factory).

_Note: requires using [Hardhat](https://hardhat.org/) with the [`hardhat-ethers`](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) plugin._

- **async function getBalancerContractAt(taskID, contract, address)**

Returns an [Ethers](https://docs.ethers.io/v5/) contract object for a contract dynamically created at a known address (e.g. a Pool created from a factory).

_Note: requires using [Hardhat](https://hardhat.org/) with the [`hardhat-ethers`](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) plugin._

- **async function getBalancerContractAbi(taskID, contract)**

Returns a contract's [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html).

- **async function getBalancerContractBytecode(taskID, contract)**

Returns a contract's [creation code](https://docs.soliditylang.org/en/latest/contracts.html#creating-contracts).

- **async function getBalancerContractAddress(taskID, contract, network)**

Returns the address of a contract's canonical deployment.

- **async function getBalancerDeployment(taskID, network)**

Returns an object with all contracts from a deployment and their addresses.

## Past Deployments

| Description                                          | Task ID                                                                                          |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Authorizer, governance contract                      | [`20210418-authorizer`](./tasks/20210418-authorizer)                                             |
| Vault, main protocol contract                        | [`20210418-vault`](./tasks/20210418-vault)                                                       |
| Weighted Pools of up to 8 tokens                     | [`20210418-weighted-pool`](./tasks/20210418-weighted-pool)                                       |
| Weighted Pools with two tokens and price oracle      | [`20210418-weighted-pool`](./tasks/20210418-weighted-pool)                                       |
| Liquidity Bootstrapping Pools of up to 4 tokens      | [`20210721-liquidity-bootstrapping-pool`](./tasks/20210721-liquidity-bootstrapping-pool)         |
| Stable Pools of up to 5 tokens                       | [`20210624-stable-pool`](./tasks/20210624-stable-pool)                                           |
| Meta Stable Pools with 2 tokens and price oracle     | [`20210727-meta-stable-pool`](./tasks/20210727-meta-stable-pool)                                 |
| Relayer for Lido stETH wrapping/unwrapping           | [`20210812-lido-relayer`](./tasks/20210812-lido-relayer)                                         |
| Distributor contract for LDO rewards                 | [`20210811-ldo-merkle`](./tasks/20210811-ldo-merkle)                                             |
| Rate Provider for wstETH                             | [`20210812-wsteth-rate-provider`](./tasks/20210812-wsteth-rate-provider)                         |
| Basic Investment Pools for few tokens                | [`20210907-investment-pool`](./tasks/20210907-investment-pool)                                   |
| Distributor contract for arbitrum BAL rewards        | [`20210913-bal-arbitrum-merkle`](./tasks/20210913-bal-arbitrum-merkle)                           |
| Distributor contract for VITA rewards                | [`20210920-vita-merkle`](./tasks/20210920-vita-merkle)                                           |
| Distributor contract for arbitrum MCB rewards        | [`20210928-mcb-arbitrum-merkle`](./tasks/20210928-mcb-arbitrum-merkle)                           |
| Merkle Orchard Distributor                           | [`20211012-merkle-orchard`](./tasks/20211012-merkle-orchard)                                     |
| Batch Relayer                                        | [`20211203-batch-relayer`](./tasks/20211203-batch-relayer)                                       |
| Linear Pools for Aave aTokens                        | [`20211208-aave-linear-pool`](./tasks/20211208-aave-linear-pool)                                 |
| Preminted BPT Meta Stable Pools                      | [`20211208-stable-phantom-pool`](./tasks/20211208-stable-phantom-pool)                           |
| Authorizer Adaptor for extending governance          | [`20220325-authorizer-adaptor `](./tasks/20220325-authorizer-adaptor)                            |
| Wallet for the BAL token                             | [`20220325-bal-token-holder-factory `](./tasks/20220325-bal-token-holder-factory)                |
| Admin of the BAL token                               | [`20220325-balancer-token-admin `](./tasks/20220325-balancer-token-admin)                        |
| Gauge Registrant                                     | [`20220325-gauge-adder`](./tasks/20220325-gauge-adder)                                           |
| Liquidity Mining: veBAL, Gauge Controller and Minter | [`20220325-gauge-controller`](./tasks/20220325-gauge-controller)                                 |
| Mainnet Staking Gauges                               | [`20220325-mainnet-gauge-factory`](./tasks/20220325-mainnet-gauge-factory)                       |
| Single Recipient Stakeless Gauges                    | [`20220325-single-recipient-gauge-factory`](./tasks/20220325-single-recipient-gauge-factory)     |
| Delegation of veBAL boosts                           | [`20220325-ve-delegation`](./tasks/20220325-ve-delegation)                                       |
| Coordination of the veBAL deployment                 | [`20220325-veBAL-deployment-coordinator`](./tasks/20220325-veBAL-deployment-coordinator)         |
| Gauges on child networks (L2s and sidechains)        | [`20220413-child-chain-gauge-factory`](./tasks/20220413-child-chain-gauge-factory)               |
| Arbitrum Root Gauges, for veBAL voting               | [`20220413-arbitrum-root-gauge-factory`](./tasks/20220413-arbitrum-root-gauge-factory)           |
| Polygon Root Gauges, for veBAL voting                | [`20220413-polygon-root-gauge-factory`](./tasks/20220413-polygon-root-gauge-factory)             |
| Coordination of setup of L2 gauges for veBAL system  | [`20220415-veBAL-L2-gauge-setup-coordinator`](./tasks/20220415-veBAL-L2-gauge-setup-coordinator) |
| Coordination of veBAL gauges fix (Option 1)          | [`20220418-veBAL-gauge-fix-coordinator`](./tasks/20220418-veBAL-gauge-fix-coordinator)           |
| veBAL Smart Wallet Checker                           | [`20220420-smart-wallet-checker`](./tasks/20220420-smart-wallet-checker)                         |
| veBAL Smart Wallet Checker Coordinator               | [`20220421-smart-wallet-checker-coordinator`](./tasks/20220421-smart-wallet-checker-coordinator) |
| Fee Distributor for veBAL holders                    | [`20220420-fee-distributor`](./tasks/20220420-fee-distributor)                                   |
| Distribution Scheduler for reward tokens on gauges   | [`20220422-distribution-scheduler`](./tasks/20220422-distribution-scheduler)                     |
| Relayer with the fix for the Double Entrypoint issue | [`20220513-double-entrypoint-fix-relayer`](./tasks/20220513-double-entrypoint-fix-relayer)       |
| Protocol Fee Withdrawer                              | [`20220517-protocol-fee-withdrawer`](./tasks/20220517-protocol-fee-withdrawer)                   |
