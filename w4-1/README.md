### W4_1作业
* 部署自己的 ERC20 合约 MyToken
* 编写合约 MyTokenMarket 实现：
   * AddLiquidity():函数内部调用 UniswapV2Router 添加 MyToken 与 ETH 的流动性
   * buyToken()：用户可调用该函数实现购买 MyToken


### 本地搭建完成

#### Fork Uniswap smart contract 

- 前置命令 

```
mkdir code1
cd code
npm init --yes 
npm install --save-dev hardhat
```

- 启动一个节点hardhat node

```
darren@darrendeMacBook-Pro code1 % npx hardhat node 
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


```

- 克隆合约代码

```
git clone https://github.com/Uniswap/v2-core.git
git clone https://github.com/Uniswap/v2-periphery.git

```


- 部署工厂合约

```
cd v2-core

darren@darrendeMacBook-Pro v2-core % npx hardhat compile
Downloading compiler 0.5.16
Compiled 12 Solidity files successfully
darren@darrendeMacBook-Pro v2-core % npx hardhat run scripts/01_deploy_factory.js --network dev 
UniswapV2Factory address:  0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690
Exported deployments into /Users/darren/Documents/project/ok/homework/w4-1/basic/v2-core/deployments/dev/UniswapV2Factory.json
UniswapV2Factory code hash:  0xaae7dc513491fb17b541bd4a9953285ddf2bb20a773374baecc88c4ebada0767

```



- 扁平化代码操作 

```
npm install truffle-flattener --save

truffle-flattener  contracts/UniswapV2Router02.sol > xx.sol
```

- 部署路由合约 

```
cd v2-periphery
```
  - 修改[路由合约](w4-1/basic/v2-periphery/scripts/01_deploy_router.js)的配置
  - 将工厂的合约的地址部署到路由合约中,详情见源码. 
 
  - 看到路由合约,工厂合约,WETH地址
      ```


      darren@darrendeMacBook-Pro v2-periphery % npx hardhat run scripts/01_deploy_router.js --network dev
      Downloading compiler 0.6.6
      Downloading compiler 0.6.12

      Compiled 31 Solidity files successfully
      facotryAddr:  0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690
      WETH address:  0x84eA74d481Ee0A5332c457a4d796187F6Ba67fEB
      Exported deployments into /Users/darren/Documents/project/ok/homework/w4-1/basic/v2-periphery/deployments/dev/WETH.json
      Router address:  0x9E545E3C0baAB3E08CdfD552C960A1050f373042
      Exported deployments into /Users/darren/Documents/project/ok/homework/w4-1/basic/v2-periphery/deployments/dev/Router.json
      ```


- 部署客户端调用路由合约 

  - 部署[Token合约](w4-1/code1/contracts/MyToken.sol) 
  - 部署[交易所合约](w4-1/code1/contracts/CryptoMarket.sol),调用IUniswapV2Route的接口.
    - [部署脚本](w4-1/code1/scripts/deploy_crypto_market.js)
    ```
      darren@darrendeMacBook-Pro code1 % npx hardhat run scripts/deploy_crypto_market.js --network dev
      AM Token 0x36C02dA8a0983159322a80FFE9F24b1acfF8B570
      owner现在持有token100000.0
      交易所的地:0x809d550fca64d94Bd9F66E60752A544199cfAC3D
      添加流动性完成 
      添加完成流动性,owner持有token95000.0
      购买完token,owner持有token95453.30544694007456579

    ```
  

> 测试网络太慢,因此没有在测试网络部署.