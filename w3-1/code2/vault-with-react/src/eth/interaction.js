import {vaultInstance} from './instance'
import web3 from '../utils/InitWeb3'

let mint = (value) => {

    return new Promise(async (resolve, reject) => {

        try { // 调用创建方法
            
            let accounts = await web3.eth.getAccounts()
            let res = await vaultInstance.methods.mint(accounts[0],value).send({
                    from: accounts[0],
                    
                }
            )
            resolve(res)
        } catch (e) {
            reject(e)
        }
    })
}


let balanceOf = (addr) => {

    return new Promise(async (resolve, reject) => {

        try { // 调用创建方法
             
            let accounts = await web3.eth.getAccounts()
            await vaultInstance.methods.balanceOf(addr).call({
                    from: accounts[0],
                }
            ).then(function(result){
                console.log(result)
                resolve(result)
            })
             
        } catch (e) {
            reject(e)
        }
    })
}

let allowance = (spenter) => {

    return new Promise(async (resolve, reject) => {

        try { // 调用创建方法
             
            let accounts = await web3.eth.getAccounts()
            await vaultInstance.methods.allowance("0x3E6ba59EfFa8d6f3f550287F33b3E6C250C83af0",spenter).call({
                    from: accounts[0],
                }
            ).then(function(result){
                resolve(result)
            })
           
        } catch (e) {
            reject(e)
        }
    })
}


let approve = (spenter,value) => {

    return new Promise(async (resolve, reject) => {

        try { // 调用创建方法
             
            let accounts = await web3.eth.getAccounts()
             await vaultInstance.methods.approve(spenter,value).send({
                    from: accounts[0],
                }
            ).then(function(result){
                resolve(result)
            })
          
        } catch (e) {
            reject(e)
        }
    })
}


let deposit = (value) => {

    return new Promise(async (resolve, reject) => {

        try { // 调用创建方法
             
            let accounts = await web3.eth.getAccounts()
             await vaultInstance.methods.deposit(value).send({
                    from: accounts[0],
                }
            ).then(function(result){
                resolve(result)
            })
            
        } catch (e) {
            reject(e)
        }
    })
}

let withdraw = (value) => {

    return new Promise(async (resolve, reject) => {

        try { // 调用创建方法
             
            let accounts = await web3.eth.getAccounts()
            await vaultInstance.methods.withdraw(value).send({
                    from: accounts[0],
                }
            ).then(function(result){
                resolve(result)
            })
             
        } catch (e) {
            reject(e)
        }
    })
}



export{
    mint,
    balanceOf,
    allowance,
    approve,
    withdraw,
    deposit,
}