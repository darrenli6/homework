pragma solidity ^0.8;

import './interfaces/IUniswap.sol';

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";



interface IUniswapV2Callee {
    function uniswapV2Call(address sender, uint amount0, uint amount1, bytes calldata data) external;
}

contract TestUniswapFlashSwap is IUniswapV2Callee{
 

    address private constant WETH = 0xc778417E063141139Fce010982780140Aa0cD5Ab;
    address private constant FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
 
    address private constant DTH= 0xa2Dbc54213De0Ff4B7534b030c3cD08216679361;
    address private constant DAI= 0xb795A877bFc364b2b23A09b3FF1A6726Db4118b2;


    event Log(string message,uint val);


    function testFlashSwap(address _tokenBorrow,uint _amount) external{

        address pair =IUniswapV2Factory(FACTORY).getPair(_tokenBorrow,DTH);
        require(pair !=address(0), "!pair");

        address token0 = IUniswapV2Pair(pair).token0();
        address token1 = IUniswapV2Pair(pair).token1();

        uint amount0Out = _tokenBorrow ==token0 ? _amount:0;
        uint amount1Out = _tokenBorrow ==token1 ? _amount:0;
   
    // 需要发送一些数据触发 
    bytes memory data =abi.encode(_tokenBorrow,_amount);
    
    IUniswapV2Pair(pair).swap(amount0Out,amount1Out,address(this),data);

    }


    // called by pair contract 
    // _sender 是合约地址
    function uniswapV2Call(
        address _sender,
        uint _amount0,
        uint _amount1,
        bytes calldata _data
    ) external override{

         address token0 = IUniswapV2Pair(msg.sender).token0();
         address token1 = IUniswapV2Pair(msg.sender).token1();
         address pair = IUniswapV2Factory(FACTORY).getPair(token0,token1);
         // 合约地址调用
         require(msg.sender == pair ,"no pair");
         require(_sender == address(this),"!sender");

         (address tokenBorrow,uint amount) = abi.decode(_data,(address,uint));
         // 手续费 about 0.3%
         uint fee = ((amount *3) /997) +1 ;

         uint amountToRepay = amount +fee ;

         // do something 
        emit Log("amount",amount);
        emit Log("amount0",_amount0);
        emit Log("amount1",_amount1);
        emit Log("fee",fee);

        emit Log("amountToRepay",amountToRepay);

        


        //还钱
         IERC20(tokenBorrow).transfer(pair,amountToRepay);
       
/*
90000000 000000
270000
*/
        

    }

}