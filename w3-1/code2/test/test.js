const ethers = require('ethers');
const config = require('./config.json');

// Import the json file from build to get the abi
const erc_json = require('../build/contracts/MyToken.json'); //import the json of the contract which you want to interact

// You can use any standard network name
//  - "homestead"
//  - "rinkeby"
//  - "ropsten"
//  - "kovan"
//  - "goerli"
const provider = ethers.getDefaultProvider(config['network']);

// Make a wallet instance using private key and provider
const wallet = new ethers.Wallet(config['private_key'] , provider);

const address = config["ERC20"];
const abi = erc_json.abi;

erc20 = new ethers.Contract( address , abi , wallet );

 
async function test() {

    let name = await erc20.functions.name();
    let symbol = await erc20.functions.symbol();
    console.log("coin name " +name);
    console.log("coin symbol " +symbol);

    // 动态增发100单位的DAC
    // let mint = await erc20.functions.mint("0xE4F2CAa1dF0Bd8c960bE63970f4FD9f08387Cd5e",100)
    // console.log(mint)
    let mycontract = await erc20.functions.transfer("0x0a79cDC4fCCf91f06bC352E750650678cbFe831b","100");
    console.log("coin mycontract " +mycontract);
    let getbalance = await erc20.functions.balanceOf("0x0a79cDC4fCCf91f06bC352E750650678cbFe831b");
    console.log( "0x0a79cDC4fCCf91f06bC352E750650678cbFe831b DAC coin getbalance " +getbalance);



    
}


test();

 
 