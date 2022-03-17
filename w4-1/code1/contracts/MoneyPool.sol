//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MoneyPool is ERC20{
     address public token0;
     address public token1;

     // 存储量
     uint public reserve0;

     uint public reserve1;

     uint public constant INITIAL_SUPPLY=10 **5;

     constructor(address _token0,address _token1) ERC20("MoneyPool ","LP"){
         token0 =_token0;
         token1 =_token1;
     }

     /*
      添加流动性
     */
     function add(uint amount0,uint amount1) public {
       address _token0 =token0;  // 节约gas
       address _token1 =token1;

     

       assert(IERC20(_token0).transferFrom(msg.sender,address(this),amount0));
       assert(IERC20(_token1).transferFrom(msg.sender,address(this),amount1));
       
       uint _reserve0 =reserve0;
       uint _reserve1 =reserve1;

       uint reserve0After =_reserve0+amount0;
       uint reserve1After =_reserve1+amount1;

       if(reserve0 ==0 && reserve0 ==0){
           _mint(msg.sender,INITIAL_SUPPLY);
       }else{
           uint currentSupply = totalSupply();
           uint newSupplyGivenReserve0Ratio = reserve0After * currentSupply / reserve0;
           uint newSupplyGivenReserve1Ratio = reserve0After * currentSupply / reserve1;
           // 求最小的 

           uint newSupply = Math.min(newSupplyGivenReserve0Ratio,newSupplyGivenReserve1Ratio);
           // 新开采多少lp
           _mint(msg.sender,newSupply-currentSupply);


       }

       reserve0 = reserve0After;
       reserve1 = reserve1After;
     }


     /*
      移除流动性 
      1 将LP到pool
      2 burn LP
      3 update reserve
     */  
     function remove(uint liquidity) public{
         assert(transfer(address(this),liquidity));
         // 拿到存储量
         uint _reserve0 =reserve0;
         uint _reserve1 =reserve1;
         
         uint currentSupply = totalSupply();
         uint amount0 = liquidity *  _reserve0/currentSupply ;
         uint amount1 = liquidity *  _reserve1/currentSupply ;

         _burn(address(this),liquidity);

         address _token0 =token0;  // 节约gas
         address _token1 =token1;

         assert(IERC20(_token0).transfer(msg.sender,amount0));
         assert(IERC20(_token1).transfer(msg.sender,amount1));

         
         reserve0= reserve0-amount0;
         reserve1= reserve1-amount1;

     }

      /*
     x*y = k
     利用公式算新的存储量
      */
      function getAmountOut(uint amountIn,address fromToken) public view returns(uint amountOut,uint _reserve0,uint _reserve1){
      
         uint newReserve0;
         uint newReserve1;

         uint k = reserve0 * reserve1;

        if (fromToken == token0){
             newReserve0 = amountIn + reserve0;
             newReserve1 = k/ newReserve0;
             amountOut = reserve1 -newReserve1;    

         }else{
             
             newReserve1 = amountIn + reserve1;
             newReserve0 = k/ newReserve1;
             amountOut = reserve0 -newReserve0;   

         }

         _reserve0= newReserve0;
         _reserve1= newReserve1;

      }



       /*
         尽可能少出币

         1 计算
         2 输出
         3 检查最小
         4 更新
       */
      
      function swap(uint amountIn,uint minAmountOut,address fromToken, address toToken,address to) public{

          require(amountIn >0 && minAmountOut >0,'invidate value ');
          require(fromToken == token0 || fromToken== token1,"fromToken invalidate");
         require(toToken == token0 || toToken== token1,"toToken invalidate");
         require(fromToken != toToken,"invalidate token ");

         (uint amountOut,uint newReserve0, uint newReserve1 )= getAmountOut(amountIn, fromToken);

         require (minAmountOut <= amountOut," again modify");
      
         assert(IERC20(fromToken).transferFrom(msg.sender,address(this),amountIn));
         assert(IERC20(toToken).transfer(to,amountOut));

   // 更新存储量
         reserve0 =newReserve0; 
         reserve1 =newReserve1; 

      }
}