
var Bank = artifacts.require("Bank");


contract("Bank",function(accounts){

    var bankInstance;

    it("得到银行名称",function(){  // it定义一个测试用例
        return Bank.deployed()
        .then(function(instance){
            bankInstance=instance;
            return bankInstance.bankName();
        }).then(function(result){
            console.log(result);
            assert.equal(result,"李佳银行");  //满足断言测试用例通过
        });
    });


    var user_address = accounts[0];
    it("存款",function(){  // it定义一个测试用例
        return Bank.deployed()
        .then(function(instance){
            bankInstance=instance;
            return bankInstance.deposite(10,{from:user_address,value:10});
        }).then(function(){
            return bankInstance.getBalance();
        }).then(function(result){
            console.log(result);
            assert.equal(result,10);  //满足断言测试用例通过
        });
    });

    var user_address = accounts[0];
    it("取款",function(){  // it定义一个测试用例
        return Bank.deployed()
        .then(function(instance){
            bankInstance=instance;
            return bankInstance.withdraw(5,{from:user_address});
        }).then(function(){
            return bankInstance.getBalance();
        }).then(function(result){
            
            assert.equal(result,5);  //满足断言测试用例通过
        });
    });


   
});