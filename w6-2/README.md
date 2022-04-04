* 实现⼀个通过 DAO 管理资⾦的Treasury：
   * 管理员可以从Treasury合约中提取资⾦withdraw（）
   * 治理Gov合约作为管理员
   * 通过发起提案从[Treasury合约](w6-2/code/contracts/Treasury.sol)资⾦





# 完成 

## 环境完成

package.json 

```
"devDependencies": {
    "@nomiclabs/hardhat-ethers": "npm:hardhat-deploy-ethers@0.3.0-beta.12",
    "@nomiclabs/hardhat-etherscan": "^3.0.0",
    "@nomiclabs/hardhat-waffle": "^2.0.2",
    "@openzeppelin/contracts": "^4.4.2",
    "@typechain/ethers-v5": "^9.0.0",
    "@typechain/hardhat": "^4.0.0",
    "@types/chai": "^4.3.0",
    "@types/mocha": "^9.1.0",
    "@types/node": "^17.0.13",
    "chai": "^4.3.6",
    "cross-env": "^7.0.2",
    "dotenv": "^10.0.0",
    "ethereum-waffle": "^3.4.0",
    "ethers": "^5.5.3",
    "fs": "^0.0.1-security",
    "fs-extra": "^10.0.0",
    "hardhat": "^2.8.3",
    "hardhat-deploy": "^0.10.4",
    "hardhat-gas-reporter": "^1.0.7",
    "prettier": "^2.5.1",
    "prettier-plugin-solidity": "^1.0.0-beta.19",
    "solhint": "^3.3.6",
    "solhint-plugin-prettier": "^0.0.5",
    "solidity-coverage": "^0.7.18",
    "ts-node": "^10.4.0",
    "typechain": "^7.0.0",
    "typescript": "^4.5.5"
  }
```





## 源码
- 实现提案Box
- 实现dao Token 


## 部署
[源码](w6-2/code/deploy/01-deploy-governor-token.ts)

```
darren@darrendeMacBook-Pro code % yarn hardhat deploy
yarn run v1.22.17
$ /Users/darren/Documents/project/ok/homework/w6-2/code/node_modules/.bin/hardhat deploy
Nothing to compile
No need to generate any newer typings.
部署dao合约币
deploying "GovernanceToken" (tx: 0x67f02484de522ed067c5be965076199986c187cf0423be594eeb6e5980403c74)...: deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3 with 3376552 gas
 部署dao币,它的地址是： 0x5FbDB2315678afecb367f032d93F642f64180aa3
✨  Done in 2.17s.
```

- 部署提案[box](w6-2/code/deploy/05-deploy-box.ts)

```
部署dao合约币
deploying "GovernanceToken" (tx: 0x67f02484de522ed067c5be965076199986c187cf0423be594eeb6e5980403c74)...: deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3 with 3376552 gas
 部署dao币,它的地址是： 0x5FbDB2315678afecb367f032d93F642f64180aa3
checkpoints  1
 已授权 
部署timelock
deploying "TimeLock" (tx: 0x5c72be07a2969c96564982c208cb7867858b7f9f33f422d858fabba1d20e6592)...: deployed at 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 with 2684072 gas
部署governorcontract
deploying "GovernorContract" (tx: 0xe2ab83eaa46cfc47de5e54f4a5341f0e3cd6f871c3fb6911cf6f7d8c41e8fdca)...: deployed at 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9 with 4480265 gas
设置角色
部署提案Box
deploying "Box" (tx: 0xcf13906a2b077e0beb76829d6d9f19d6f8576142288af69a09c54d14398dfad4)...: deployed at 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853 with 445808 gas
转移授权,转移给timelock合约
部署提案Treasury
deploying "Treasury" (tx: 0xa9cb3531b4e3ba5eea5186d2c64f62189d53d3a6a2579b2cf556467b3f3ef3d9)...: deployed at 0x8A791620dd6260079BF849Dc5567aDC3F2FdC318 with 816289 gas
Treasury转移授权,转移给timelock合约
✨  Done in 2.71s.

```


# 测试

- 启动节点 

```
darren@darrendeMacBook-Pro code % yarn hardhat node
yarn run v1.22.17
$ /Users/darren/Documents/project/ok/homework/w6-2/code/node_modules/.bin/hardhat node
Nothing to compile
No need to generate any newer typings.
部署dao合约币
deploying "GovernanceToken" (tx: 0x2dccc76b3c1d5b20fe697861b171bbf467b3df8fc3a0e30d24fcc8ffb1fc4f4c)...: deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3 with 3376552 gas
 部署dao币,它的地址是： 0x5FbDB2315678afecb367f032d93F642f64180aa3
checkpoints  1
 已授权 
部署timelock
deploying "TimeLock" (tx: 0x2c1fe7c8be2892627cb739980e956af4e59df0fda51117ca1ebb23f9387325c2)...: deployed at 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 with 2684072 gas
部署governorcontract
deploying "GovernorContract" (tx: 0x744c2e6144e17508973698cba5272fec4bf39c2c642192713b5e00c50742a717)...: deployed at 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9 with 4480265 gas
设置角色
部署提案Box
deploying "Box" (tx: 0xd770aadf5b5aedf72eae0ce5e65be5ebc20ec8e57621b23eccda8770388ab2a0)...: deployed at 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853 with 445808 gas
转移授权,转移给timelock合约
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========

WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.

Account #0: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

Account #2: 0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc (10000 ETH)
Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a

Account #3: 0x90f79bf6eb2c4f870365e785982e1f101e93b906 (10000 ETH)
Private Key: 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6

Account #4: 0x15d34aaf54267db7d7c367839aaf71a00a2c6a65 (10000 ETH)
Private Key: 0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a

Account #5: 0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc (10000 ETH)
Private Key: 0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba

Account #6: 0x976ea74026e726554db657fa54763abd0c3a0aa9 (10000 ETH)
Private Key: 0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e

Account #7: 0x14dc79964da2c08b23698b3d3cc7ca32193d9955 (10000 ETH)
Private Key: 0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356

Account #8: 0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f (10000 ETH)
Private Key: 0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97

Account #9: 0xa0ee7a142d267c1f36714e4a8f75612f20a79720 (10000 ETH)
Private Key: 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6

```



- 发出[提案](w6-2/code/scripts/propose.ts)
  
```
darren@darrendeMacBook-Pro code % yarn hardhat run scripts/propose.ts --network localhost
yarn run v1.22.17
$ /Users/darren/Documents/project/ok/homework/w6-2/code/node_modules/.bin/hardhat run scripts/propose.ts --network localhost
No need to generate any newer typings.
 encodedFunctionCall调用   0x6057361d000000000000000000000000000000000000000000000000000000000000004d
 提案地址: 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853 带着参数77 
 提案描述: 提案 将 77 存储到box合约中 
Moving blocks...
Moved 2 blocks
✨  Done in 3.39s.
```  


- [投票](w6-2/code/scripts/vote.ts)

```
darren@darrendeMacBook-Pro code % yarn hardhat run scripts/vote.ts --network localhost 
yarn run v1.22.17
$ /Users/darren/Documents/project/ok/homework/w6-2/code/node_modules/.bin/hardhat run scripts/vote.ts --network localhost
No need to generate any newer typings.
Moving blocks...
Moved 2 blocks
已经完成投票
✨  Done in 3.35s.
```
- 查看状态.查找到提案id,进入控制台查找状态

```
darren@darrendeMacBook-Pro code % yarn hardhat console --network localhost
yarn run v1.22.17
$ /Users/darren/Documents/project/ok/homework/w6-2/code/node_modules/.bin/hardhat console --network localhost
No need to generate any newer typings.
Welcome to Node.js v16.14.0.
Type ".help" for more information.
>      const governor  =await ethers.getContract("GovernorContract");
undefined
> await governor.state("111085155227609244109640662979478454730546206799634035930611177883882510671482")
4
```

- id枚举

https://github.com/darrenli6/openzeppelin-contracts/blob/master/contracts/governance/IGovernor.sol

```
enum ProposalState {
        Pending,  0 
        Active, 1
        Canceled, 2
        Defeated, 3
        Succeeded, 4
        Queued, 5
        Expired, 6
        Executed 7
    }

```

- 进入队列，进行执行，修改值 

```
darren@darrendeMacBook-Pro code % yarn hardhat run scripts/queue-and-execute.ts --network localhost
yarn run v1.22.17
$ /Users/darren/Documents/project/ok/homework/w6-2/code/node_modules/.bin/hardhat run scripts/queue-and-execute.ts --network localhost
No need to generate any newer typings.
进入队列 即将执行
Moving blocks...
Moved forward in time 3601 seconds
Moving blocks...
Moved 1 blocks
执行中
投票之后的值改为：77
✨  Done in 3.64s.
```


# 错误 

```
'getContract' function does not exist when used with hardhat-waffle #12

```

- 解决
```
 npm i -D @nomiclabs/hardhat-ethers
 
darren@darrendeMacBook-Pro code % npm install --save-dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers

npm install --save-dev hardhat-deploy-ethers ethers
yarn hardhat deploy  


```
