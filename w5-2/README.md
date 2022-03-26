* 在一笔交易中完成（模拟闪电贷交易）
   * 在 AAVE 中借款 token A
   * 使用 token A 在 Uniswap V2 中交易兑换 token B，然后在 Uniswap V3 token B 兑换为 token A
   * token A 还款给 AAVE



## 环境准备 

```
npm init --y
npm install --save-dev hardhat 
npx hardhat 

```

w5-2/code/package.json

引入依赖

```
"devDependencies": {
    "@nomiclabs/hardhat-ethers": "^2.0.2",
    "@nomiclabs/hardhat-waffle": "^2.0.1",
    "@typechain/ethers-v5": "^7.0.1",
    "@typechain/hardhat": "^2.1.1",
    "@types/chai": "^4.2.19",
    "@types/mocha": "^8.2.2",
    "@types/node": "^15.14.0",
    "chai": "^4.3.4",
    "ethereum-waffle": "^3.4.0",
    "ethers": "^5.4.0",
    "hardhat": "^2.4.1",
    "ts-node": "^10.0.0",
    "typechain": "^5.1.1",
    "typescript": "^4.3.5",
    "@uniswap/v3-core": "1.0.0"
  },
  "dependencies": {
    "@openzeppelin/contracts": "^4.2.0",
    "hardhat-watcher": "^2.1.1"
  }
```

## 完成 

- 编译

```
darren@darrendeMacBook-Pro code % npx hardhat compile
```

[闪电贷合约](w5-2/code/contracts/MyV2FlashLoan.sol)

-  部署合约，给合约充值 

```
npx hardhat run scripts/1.depoly_myv2FlashLoad.ts --network kovan
```

[合约脚本](w5-2/code/scripts/1.depoly_myv2FlashLoad.ts)


hashURL :https://kovan.etherscan.io/tx/0xc7c250b0887a2b8e40f00f8b637eb36be4dbcb1936104bafbb04557dedb15e86


- 执行闪电贷 

[合约源码](w5-2/code/scripts/2.exe_myv2FlashLoad.ts)

```
darren@darrendeMacBook-Pro code % npx hardhat run scripts/2.exe_myv2FlashLoad.ts --network kovan 
No need to generate any newer typings.
MyV2FlashLoan的合约地址是: 0x5E9861De6b23a51424653f45C8037385735D49E1
闪电贷款成功
```

https://kovan.etherscan.io/tx/0x0535e0c08796915777b77b92d065e495f73913e36f4c7a83e64c983d4e76828f
