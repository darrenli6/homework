//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

 
import "@openzeppelin/contracts/access/Ownable.sol";
 

contract Box is Ownable{

    uint256 private value ;


    event valueChange(uint256 newvalue);

    function store(uint256 newValue) public onlyOwner{
        value = newValue;
        emit valueChange(newValue);
    }

    function retrieve() public view returns(uint256){
        return value;
    }
}