import React, {Component} from 'react';

import web3 from '../../utils/InitWeb3'

import {vaultInstance} from '../../eth/instance'

class BasicInfoTab extends Component {

    constructor(){
        super()
        this.state ={
          currentAccount : '',
          currentErc20ContractAddr :'',
          getThisVaultAddr:'',
          currentContractAddr:'',
    
        }
      }

      async componentWillMount() {
        let accounts = await web3.eth.getAccounts()
    
        let getThisErC20Addr =await vaultInstance.methods.getThisErC20Addr().call();
    
        let getThisVaultAddr =await vaultInstance.methods.getThisVaultAddr().call();
    
        let currentContractAddr =await vaultInstance.methods.currentAddr().call();
    
    
    
      
         
        
        this.setState({
           currentAccount: accounts[0],
           currentErc20ContractAddr:getThisErC20Addr,
           getThisVaultAddr:getThisVaultAddr,
           currentContractAddr:currentContractAddr,
           
        })
    }

    
    render() {
        return (
            <div>
         <p>当前用户钱包地址:{this.state.currentAccount}</p>
         <p>当前合约地址:{this.state.currentErc20ContractAddr}</p>
         


            </div>
        )
    }
}

export default BasicInfoTab
