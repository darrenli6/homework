import { expect, use } from 'chai'
import { solidity } from 'ethereum-waffle'
import { ethers } from 'hardhat'
import { Token } from '../typechain/Token'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'


use(solidity)



describe("Token",function(){
    let eth: Token
    let dai: Token 
    let accounts : SignerWithAddress[]

    this.beforeEach(async ()=>{
      accounts =await ethers.getSigners();

      const Token = await ethers.getContractFactory("Token");

      eth = await Token.deploy('Ethereum', 'DTH', 100000000000) as Token
      dai = await Token.deploy('DAI', 'DAI', 1000000000000000) as Token

      
      const [, accoun1, account2,account3, account4]= accounts

      for (const account of [accoun1, account2,account3, account4]){
         await (await eth.transfer(account.address,200)).wait()
         await (await dai.transfer(account.address,10000000)).wait()


      }
      
       
    });

    it("测试账号余额",async function(){
        expect(await eth.balanceOf(accounts[2].address)).to.equal(200)

    });


    
    
});
