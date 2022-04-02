//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


contract Option is ERC20,Ownable{
    using SafeERC20 for IERC20;

    uint public price;

    address public usdcToken;

    uint public settlementTime;
     // 有效时间
    uint public constant during = 1 days; 

    

    constructor(address _usdc)  ERC20("callOption","OPT")  {
         usdcToken = _usdc;
         price =10 ;
         settlementTime  = 100 days;

         
    }

    // 1eth  10^18    =  10^18 OPT
    function mint(uint  _value ) external payable onlyOwner{
        _mint(msg.sender,_value);
        safeTransferETH(address(this),_value);
    }
    // 行权多少
    function settlement(uint amount) external{
        //  require(block.timestamp >= settlementTime  && 
        //         block.timestamp <= settlementTime+during, "invalid time" );
         _burn(msg.sender,amount);
         uint usdcAmount =price * amount;

         // 行权 你把钱打给对手方

        /*
         如果知道token的 用transfer 
         如果不知道token的 用 safetransfer 
         用户要调用approve
        */
          // 我将usdt打给合约
        // before erc20 approve address(this)
         IERC20(usdcToken).safeTransferFrom(msg.sender,address(this),usdcAmount);
            // 给我打ETH
         safeTransferETH(msg.sender,amount);



    }

    // uniswap的代码
    function safeTransferETH(address _to,uint256 _value) internal{
      (bool success,) = _to.call{value: _value}(new bytes(0));
      require(success,"eth transfer failed");
    }


    function burnAll() external onlyOwner{
       require(block.timestamp >= settlementTime + during, "have not end");
       uint usdcAmountl = IERC20(usdcToken).balanceOf(address(this));
       IERC20(usdcToken).safeTransfer(msg.sender,usdcAmountl);
        
       selfdestruct(payable(msg.sender));

       uint ethAmount = address(this).balance;
       safeTransferETH(msg.sender, ethAmount); 
    }





}



