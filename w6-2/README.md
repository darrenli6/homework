* 实现⼀个通过 DAO 管理资⾦的Treasury：
   * 管理员可以从Treasury合约中提取资⾦withdraw（）
   * 治理Gov合约作为管理员
   * 通过发起提案从Treasury合约资⾦





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



