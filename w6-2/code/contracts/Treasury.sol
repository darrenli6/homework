//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

 
import "@openzeppelin/contracts/access/Ownable.sol";
 

contract Treasury is Ownable{

    // 构造方法存入资产

    mapping(address=>uint) public deposits;
    uint public total;
  


    constructor() payable {
         
        deposits[msg.sender] +=msg.value;
        total+=msg.value;
    }


    function deposit() public payable {
        require(msg.value >0,"deposit failed");
        deposits[msg.sender] +=msg.value;
        total+=msg.value;
    }

    function withdraw(uint amount) public {
         require(deposits[msg.sender]>=amount,"withdraw failed");
         deposits[msg.sender] -=amount;
          total-=amount;
         (bool suc,) =msg.sender.call{value:amount}("");

         assert(suc);
    }
 
      

    function withdrawAll() public onlyOwner{
         
         (bool suc,) =msg.sender.call{value:total}("");
         deposits[msg.sender] =0;
         total=0;
         assert(suc);
    }
   // 直接在metamask在钱包里打钱
   receive() external payable{
        deposits[msg.sender] += msg.value;
         total+=msg.value;

   }
   
   function getBalance(address addr) public view returns(uint){
      return deposits[addr];
   }

}