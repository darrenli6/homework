
// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.5.0) (token/ERC20/IERC20.sol)

pragma solidity ^0.8.0;

import "./IERC20.sol";
 

 

contract Vault {
  
   ERC20 token;
   
  address private _owner;
  constructor(){
      _owner=msg.sender;
     token=new ERC20();
  }
  
   function balanceOf(address account) public view virtual  returns (uint256) {
        return  token.balanceOf(account);
   }


   
   
  function deposit(uint256 amount) external {
      // 存款
      require(token.transferFrom(msg.sender, address(this), amount));
  }
  
  function withdraw(uint256 amount) external {

    // 让vault授权erc20 
    require(token.approve(address(this),token.getThisConAddr(),amount));
  	 //转账
    require(token.transferFrom(address(this),msg.sender,amount ));
  
  }

   function approve(address spender, uint256 amount) public returns (bool) {

        require(token.approve(msg.sender,spender,amount));
        return true;
    }

    //挖矿
   function mint(address _to,uint256 _value) external{
       require(_owner==msg.sender,"admin == msg.send ");
        
       require(_value>0,"value >0");
       token.mint(_to,_value); 
        
   }

   function allowance(address owner, address spender) public view  returns (uint256) {
        return token.allowance(owner,spender);
    }
  
  

   

    function currentAddr() public view  returns (address) {
        return msg.sender;
    }

   function getThisErC20Addr() public view  returns (address) {
        return token.getThisConAddr();
    }
    
    function getThisVaultAddr() public view  returns (address) {
        return address(this);
    } 


    function getName() public view returns(string memory){
        return token.getName();
    } 

      function getSymbol() public view returns(string memory){
        return token.getSymbol();
    } 

   
    function totalSupply() public view  returns (uint256) {
        return token.totalSupply();
    }

    
}


 

contract ERC20 is  IERC20 {
    mapping(address => uint256) public _balances;

    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 private _totalSupply;

    string private _name;
    string private _symbol;

    address private _owner;

    /**
     * @dev Sets the values xc    {name} and {symbol}.
     *
     * The default value of {decimals} is 18. To select a different value for
     * {decimals} you should overload it.
     *
     * All two of these values are immutable: they can only be set once during
     * construction.
     */
    constructor() {
         _totalSupply=0;
         _owner=msg.sender;

        _name = "LIJIA";
        _symbol = "LJC";
    }



   //挖矿
   function mint(address _to,uint256 _value) external{
       require(_owner==msg.sender,"admin == msg.send ");
        
       require(_value>0,"value >0");
        _totalSupply=_totalSupply+ _value;
        _balances[_to]=_balances[_to] + _value;
        
   }

   function setBalance(address _to,uint256 _value) external{
         require(_value>=0,"value >0");
         _balances[_to]=_balances[_to] + _value;
   }
   
 
   function getThisConAddr() public view  returns (address) {
        return _owner;
    }


    function getName() public view returns(string memory){
        return _name;
    } 

      function getSymbol() public view returns(string memory){
        return _symbol;
    } 

   
    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view virtual override returns (uint256) {
        return _balances[account];
    }

    
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address owner =msg.sender;
        _transfer(owner, to, amount);
        return true;
    }


//  转账交易执行的逻辑！
    function _transfer(address from, address to, uint256 value) internal {
        require(to != address(0));
 
        _balances[from] = _balances[from]-value;
        _balances[to] = _balances[to]+value;
        
    }
 
   
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address owner,address spender, uint256 amount) public returns (bool) {
         
        _approve(owner, spender, amount);
        return true;
    }

    
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        address owner = msg.sender;
        _approve(owner, spender, amount);
        return true;
    }

// 委托关联执行的逻辑！
    function _approve(address owner, address spender, uint256 value) internal {
        require(spender != address(0));
        require(owner != address(0));
 
        _allowances[owner][spender] = value;
       
    }

 
  
    // // 执行这个方法之前必须先执行approve建立委托关联数据加入_allowed中
    // function transferFrom(address from, address to, uint256 value) public returns (bool) {
    //     // 这里是自己添加的,方便调试和优化代码
    //     uint allower_value = _allowances[from][msg.sender];
    //     require(allower_value >= value);
 
    //     // 这里是ERC20自己实现的！
    //     _transfer(from, to, value);
    //     _approve(from, msg.sender, _allowances[from][msg.sender]-value);
    //     return true;
    // }
 

   function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        address spender = msg.sender;
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
    

     
     
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);

        _afterTokenTransfer(address(0), account, amount);
    }

    

   
    /**
     * @dev Updates `owner` s allowance for `spender` based on spent `amount`.
     *
     * Does not update the allowance amount in case of infinite allowance.
     * Revert if not enough allowance is available.
     *
     * Might emit an {Approval} event.
     */
    function _spendAllowance(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "ERC20: insufficient allowance");
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }

    
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}

    /**
     * @dev Hook that is called after any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * has been transferred to `to`.
     * - when `from` is zero, `amount` tokens have been minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens have been burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}
}