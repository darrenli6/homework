// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
 /*
   当有提案来临的 时候，
   他们持有token，可以投票
   
   snapshot of tokens people have at a certain block 
 */

contract GovernanceToken is ERC20Votes{
     uint256 public s_maxSupply = 1000000000000000000000000;

  constructor() ERC20("GovernanceToken", "GT") ERC20Permit("GovernanceToken") {
    _mint(msg.sender, s_maxSupply);
  }



      function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal  override(ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);

       
    }
      function _mint(address account, uint256 amount) internal  override(ERC20Votes) {
        super._mint(account, amount);
       
    }
    
   function _burn(address account, uint256 amount) internal  override(ERC20Votes) {
        super._burn(account, amount);
 
    }

}


