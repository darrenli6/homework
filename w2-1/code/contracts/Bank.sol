pragma solidity ^0.6.1;
import "./safemath.sol";

contract Bank{
    using SafeMath for uint256;
    
    mapping(address=>uint256) balances;

    string public bankName;

    uint256 toalAmount;

    uint256  numberOfHis;

    event Transfer(address from,address to,uint256 amount,uint256 timestamp,uint256 index );


    struct history{
       address from;
       address to;
       uint timestamp;
       uint256 amount;
    }

  
   

    mapping(address=> mapping(uint=>history) ) public histories;

    constructor(string memory name) public{
        bankName=name;
        toalAmount =0 ;
        numberOfHis=0;
    }

    //存钱
    function deposite(uint256 amount ) external payable{
       require(amount >0 ,"存款必须大于0");
       require(msg.value==amount,"存款必须等于value");
       balances[msg.sender] = SafeMath.add(balances[msg.sender],amount);
       toalAmount = SafeMath.add(toalAmount,amount);

       

       require(toalAmount == address(this).balance ,"银行余额校验");

    }

    
     //取钱
    function withdraw(uint256 amount ) external payable{
       require(amount >0 ,"取钱必须大于0");
       require( balances[msg.sender] >=amount,"取钱必须等于value");
       msg.sender.transfer(amount);
       balances[msg.sender] = SafeMath.sub(balances[msg.sender],amount);
       toalAmount = SafeMath.sub(toalAmount,amount);

      

       require(toalAmount == address(this).balance ,"银行余额校验");

    }
 
    // 转账

    function transfer(address to,uint256 amount ) external{
       require(amount >0 ,"金额必须大于0");
       require(balances[msg.sender]>=amount,"钱必须足够");
       require(address(0) !=to, "to必须是一个有效地址");
       balances[msg.sender] = SafeMath.sub(balances[msg.sender],amount);
       balances[to] = SafeMath.add(balances[to],amount);


      //存储历史记录
       histories[msg.sender][numberOfHis].timestamp=now;
       histories[msg.sender][numberOfHis].from=msg.sender;
       histories[msg.sender][numberOfHis].to=to;
       histories[msg.sender][numberOfHis].amount=amount;
       

       emit Transfer(msg.sender,to,amount,now,numberOfHis);
       numberOfHis++;
       require(toalAmount == address(this).balance ,"银行余额校验");

    }

    function getBalance() external view returns (uint256){
       return balances[msg.sender];
    }

    function getTotalAmount() external view returns(uint256,uint256){
       return (toalAmount,address(this).balance);
    }


   


} 