import React, {Component} from 'react';
import Layer from 'react-layui-layer';
 
import { Button, Form } from 'semantic-ui-react'
 

import {approve, 
    deposit,
    withdraw} from '../../eth/interaction'



class OperationTab extends Component {

    constructor(){
        super()
        this.state ={
          authaddr:'',
          authvalue:'',
          depositevalue:'',
          withdrawvalue:'',
          isshow:false,
          resmsg:'',
          
    
        }

      
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


        //表单数据数据变化时触发
    handleChange = (e, {name, value}) => this.setState({[name]: value})

    handleApproveClick = async () => {
         

        try {
            let res = await approve(this.state.authaddr,this.state.authvalue)
            console.log(res)
            if(res){
                this.showWindow("授权金额成功");
                 
            }else{
                this.showWindow("授权金额失败");
                
            }
            
            
        } catch (e) {
           
            console.log(e)
        }
      }

      handleDepositeClick = async () => {
         

        try {
            let res = await deposit(this.state.depositevalue)
            console.log(res)
            if(res){
                this.showWindow("存款成功");
                 
            }else{
                this.showWindow("存款失败");
                
            }
            
        } catch (e) {
            console.log(e)
        }
      }

      handleWithDrawClick = async () => {
         

        try {
            let res = await withdraw(this.state.withdrawvalue)
            if(res){
                this.showWindow("提现成功");
                 
            }else{
                this.showWindow("提现失败");
                
            }
            
        } catch (e) {
            console.log(e)
        }
      }

      async componentWillMount() {
         
    
      
         
        
        this.setState({
            
           
        })
    }

    
    render() {
        return (
            <div>
                 <Layer visible={this.state.isshow} width="300px" height="100px"  onCancel={this.onCancel}>
                         <span>{this.state.resmsg}</span>
                </Layer>
         <Form>     
    <Form.Field>
      <label>授权</label>
      <Form.Input placeholder='授权地址' value={this.state.allowValue} name="authaddr"  onChange={this.handleChange}  />
    </Form.Field>
    <Form.Field>
      <label>授权金额</label>
      <Form.Input placeholder='授权金额' value={this.state.allowValue} name="authvalue"  onChange={this.handleChange}  />
    </Form.Field>
    <Button type='button' onClick={this.handleApproveClick} value="">Submit</Button>
     
     
  </Form>

  <Form>     
    <Form.Field>
      <label>存款金额</label>
      <Form.Input placeholder='存款金额' value={this.state.depositevalue}  name="depositevalue"  onChange={this.handleChange}  />
    </Form.Field>
    <Button type='button' onClick={this.handleDepositeClick} value="">Submit</Button>
  </Form>

  <Form> 
  <Form.Field>
      <label>提现</label>
      <Form.Input placeholder='提现金额' value={this.state.withdrawvalue}  name="withdrawvalue"  onChange={this.handleChange}  />
    </Form.Field>
    <Button type='button' onClick={this.handleWithDrawClick} value="">Submit</Button>
  </Form>
            </div>
        )
    }
}

export default OperationTab
