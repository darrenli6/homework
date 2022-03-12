import React, {Component} from 'react';

import { Button, Form } from 'semantic-ui-react'
import Layer from 'react-layui-layer';

import {vaultInstance} from '../../eth/instance'
 

import {mint, 
        balanceOf,
        allowance} from '../../eth/interaction'


class Erc20Tab extends Component {

    constructor(){
        super()
        this.state ={
          getName : '',
          getSymbol :'',
          totalSupply:'',
          getThisErC20Addr:'',
          value: '',
          allowValue:'',
          addrValue:'',
          isshow:false,
          resmsg:'',
          
    
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleAddrChange = this.handleAddrChange.bind(this);
        this.handleAllowChange = this.handleAllowChange.bind(this);
      }

   showWindow = (msg) => {
        this.setState({
            isshow: true,
            resmsg:msg,
        });
    
    };
   onCancel = () => {
        this.setState({
            isshow: false
        });
    
    };




      async componentWillMount() {
         
        let getThisErC20Addr =await vaultInstance.methods.getThisErC20Addr().call();
        let getName =await vaultInstance.methods.getName().call();
        let getSymbol =await vaultInstance.methods.getSymbol().call();
        let totalSupply =await vaultInstance.methods.totalSupply().call();
    
    
        
    
      
      
         
        
        this.setState({
            getName: getName,
            getSymbol:getSymbol,
            totalSupply:totalSupply,
            getThisErC20Addr:getThisErC20Addr,
            
            
           
        })

         
    }

    handleClick = async () => {
        console.log('this is:', this.state.value);

        try {
            let res = await mint(this.state.value)
            console.log(res)
            
        } catch (e) {
            console.log(e)
        }
      }

      handleChange(event) {
        console.log(event.target.value)
        this.setState({value: event.target.value});
      } 



    // 地址余额
    handleAddrChange(event) {
        console.log(event.target.value)
         
        this.setState({addrValue: event.target.value});
      }  

    
   handleAddrClick = async () => {
         

        try {
            let res = await balanceOf(this.state.addrValue)
            if(res){
                this.showWindow("金额:"+res);
                 
            }else{
                this.showWindow("获取金额失败");
                
            }
            
        } catch (e) {
            console.log(e)
        }
      }

     // 授权余额
   // 地址余额
   handleAllowChange(event) {
    console.log(event.target.value)
    this.setState({allowValue: event.target.value});
  }  


handleAllowClick = async () => {
     

    try {
        let res = await allowance(this.state.allowValue)
        if(res){
            this.showWindow("授权金额:"+res);
             
        }else{
            this.showWindow("获取授权失败");
            
        }
        
    } catch (e) {
        console.log(e)
    }
  }

    
    render() {
        return (

            <div>

                 <Layer visible={this.state.isshow} width="300px" height="100px"  onCancel={this.onCancel}>
                         <span>{this.state.resmsg}</span>
                </Layer>
         <p>名称:{this.state.getName}</p>
         <p>标识:{this.state.getSymbol}</p>
         <p>发行量:{this.state.totalSupply}</p>

         <p>地址:{this.state.getThisErC20Addr}</p>
         
  <Form>     
    <Form.Field>
      <label>挖量</label>
      <input placeholder='数量' value={this.state.value}   onChange={this.handleChange}  />
    </Form.Field>
    <Button type='button' onClick={this.handleClick} value="">Submit</Button>
  </Form>

  <Form>     
    <Form.Field>
      <label>授权余额</label>
      <input placeholder='地址' value={this.state.allowValue}   onChange={this.handleAllowChange}  />
    </Form.Field>
    <Button type='button' onClick={this.handleAllowClick} value="">Submit</Button>
  </Form>

  <Form>     
    <Form.Field>
      <label>地址余额</label>
      <input placeholder='地址' value={this.state.addrValue}   onChange={this.handleAddrChange}  />
    </Form.Field>
    <Button type='button' onClick={this.handleAddrClick} value="">Submit</Button>
  </Form>
 


            </div>
        )
    }
}

export default Erc20Tab
