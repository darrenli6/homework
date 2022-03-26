pragma solidity 0.6.12;


import {ILendingPoolAddressesProvider,ILendingPool,IERC20}  from './interfaces/interfaces.sol';

import {SafeMath} from './interfaces/Libraries.sol';

import { FlashLoanReceiverBase } from './interfaces/FlashLoanReceiverBase.sol';

contract MyV2FlashLoan is FlashLoanReceiverBase{



using SafeMath for uint256;

event Log(string message,uint val);

address public kovanUsdc = 0xe22da380ee6B445bb8273C81944ADEB6E8450422;
address public kovanAave = 0xB597cd8D3217ea6477232F9217fa70837ff667Af;
address public kovanDai = 0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD;
address public kovanLink = 0xAD5ce863aE3E4E9394Ab43d4ba0D80f419F61789;

address public aave_lending_poolv2_kovan= address(0x88757f2f99175387aB4C6a4b3067c77A695b0349);

   
    constructor(ILendingPoolAddressesProvider _addressProvider) FlashLoanReceiverBase(_addressProvider) public{

    }

    function executeOperation(
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata premiums,
        address initiator,
        bytes calldata params
    ) external override returns(bool){
   
        
// do something 

/*
Tokens Transferred:
3
From 0xe12afec5aa12cf614678f9bfeeb98ca9bb95b5b0To 0x1dba5d30200ae4c34cbc9d928890b0a7bfc61dc0 For 1,000,000 USD Coin (USDC)

 1,000,000 USDC打到我的合约
From 0x0000000000000000000000000000000000000000To 0x464c71f6c2f760dda6093dcb91c24c39e5d6e18c For 6,243,133,046,688,380.346756 Aave interes... (aUSDC)
From 0x1dba5d30200ae4c34cbc9d928890b0a7bfc61dc0To 0xe12afec5aa12cf614678f9bfeeb98ca9bb95b5b0 For 1,000,900 USD Coin (USDC)
 1,000,900 从我合约payback

*/



       // 还款  必须让操作自己资产    premiums 0.09%利息
        for (uint i=0;i<assets.length;i++){

             uint amountOwing = amounts[i].add(premiums[i]);
             
             emit Log("amountOwing ",amountOwing);
             IERC20(assets[i]).approve(address(LENDING_POOL),amountOwing);
        }
        return true;
    }


    function myFlashLoanCall() public {
      // 让谁接收这个币
        address receiverAddress =address(this);
// 借一种资产  usdc   还可以借多种资产
        address[] memory assets = new address[](1);
        assets[0] =kovanUsdc;

        uint256[] memory amounts= new uint256[](1);
        amounts[0]=1_000_000 *10 **6;

       // 1 固定利率
       // 2 动态年利率
        // 0 flashloan  1 =stable 2 variable 

    
        uint256[] memory modes =new uint256[](1);
        modes[0]=0;

     // 代表谁来借
        address onBehalfOf=address(this);
        // 区块链的痕迹
        bytes memory params = "CryptoDarren Test flashloan";

        uint16 referralCode=0 ;
    // 会有callback 到 executeQperation
        LENDING_POOL.flashLoan(
            receiverAddress,
            assets,
            amounts,
            modes,
            onBehalfOf,
            params,
            referralCode
        );


    }


    function flashLoanTutorial() public pure returns(bool){
        // borrow 10000 
        // xxx
        //payback
        return true;
    }


}