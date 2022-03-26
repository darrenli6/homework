pragma solidity ^0.8;

import './interfaces/ISwapV3Router.sol';

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestUniswap{
   
   address private constant UNISWAP_V3_ROUTER= 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

   address private constant WETH= 0xc778417E063141139Fce010982780140Aa0cD5Ab;

    struct ExactInputParams {
        bytes path;
        address recipient;
        uint256 deadline;
        uint256 amountIn;
        uint256 amountOutMinimum;
       }


   function swap(
   address _tokenIn,
   address _tokenOut,
   uint _amountIn,
   uint _amountOutMin,
   address _to 
   ) external{
       

        

  
       IERC20(_tokenIn).transferFrom(msg.sender,address(this),_amountIn);
       IERC20(_tokenIn).approve(UNISWAP_V2_ROUTER,_amountIn);

       address[] memory path;

       if (_tokenIn==WETH || _tokenOut==WETH){
           path =new address[](2);
           path[0]= _tokenIn;
           path[1]= _tokenOut;
       }else{
            
           path=new address[](2);
           path[0]=_tokenIn;
           path[1]=_tokenOut;
       }

       ExactInputParams exactInputParams=ExactInputParams({
           
       });
      
    

       ISwapRouter(UNISWAP_V3_ROUTER).swapExactTokensForTokens(
           _amountIn, _amountOutMin, path, _to, block.timestamp);   

   }


   function getAmountOutMin(
       address _tokenIn,
       address _tokenOut,
       uint _amountIn
   ) external view returns(uint){
 
  address[] memory path;
  if (_tokenIn==WETH || _tokenOut==WETH){
           path =new address[](2);
           path[0]= _tokenIn;
           path[1]= _tokenOut;
       }else{
            
           path=new address[](2);
           path[0]=_tokenIn;
           path[1]=_tokenOut;
       }

       uint[] memory amountOutMin =IUniswapV2Router(UNISWAP_V2_ROUTER).getAmountsOut(_amountIn,path );
       return amountOutMin[path.length-1];
 
   }


}