pragma solidity ^0.8.0;

import "hardhat/console.sol";
contract Counter{

   uint public counter;

   constructor(){
       counter=0;
       console.log("current counter value ",counter);
   }
   function count() public {
       counter=counter+1;
       console.log("current counter value ",counter);
   }

   function set(uint x) public {
       
       counter=x ;
       console.log("current counter value ",counter);
   }

   function add(uint x) public {
       console.log("add x ",x);
       counter=counter+x ;
        
       console.log("current counter value ",counter);
   }

  

}