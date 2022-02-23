
const Counter = artifacts.require("Counter");


 module.exports =async function(callback){

   try{
     var counter =await Counter.deployed();

    } catch {
        console.error("You are connected to the wrong network");
      }
     await counter.count();
      await counter.count();

     let value =await counter.counter();

     console.log("current counter value "+value);
 }