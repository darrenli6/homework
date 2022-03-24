//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./IUniswapV2Router.sol";
import "./IMasterChef.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract CryptoMarket{
    using SafeERC20 for IERC20;

    address public mytoken;

    address public router ;

    address public weth;

    address public masterchef;

    constructor(address _token,address _router, address _weth,address _masterchef){
        mytoken = _token;
        router =_router;
        weth =_weth;
        masterchef=_masterchef;

    }

    // 添加流动性
    function addLiquidity(uint tokenAmount) public payable{
        // 授权
        IERC20(mytoken).safeTransferFrom(msg.sender,address(this),tokenAmount);
        IERC20(mytoken).safeApprove(router,tokenAmount);

        //
        IUniswapV2Router01(router).addLiquidityETH{value:msg.value}(mytoken, tokenAmount, 0, 0, msg.sender, block.timestamp);

    }

     // 用ETH 购买token
     function buyToken(uint minTokenAmount) public payable{
         address[] memory path =new address[](2);
         path[0]=weth;
         path[1]= mytoken;

         IUniswapV2Router01(router).swapExactETHForTokens{value:msg.value}(minTokenAmount, path, address(this), block.timestamp);
     
        // 存入
         uint amount= IERC20(mytoken).balanceOf(address(this));
          IERC20(mytoken).safeApprove(masterchef,amount);
         IMasterChef(masterchef).deposit(1,amount);

     
     }
     
     
      

}