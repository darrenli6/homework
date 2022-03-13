const { ethers, network } = require("hardhat");
 
async function parseTransferEvent(event) {
    const TransferEvent = new ethers.utils.Interface(["event Transfer( address indexed _from, address indexed _to, uint256 indexed _tokenId )"]);
    let decodedData = TransferEvent.parseLog(event);
    // console.log("decodedData "+decodedData.args);
    console.log("_from:" + decodedData.args._from);
    console.log("_to:" + decodedData.args._to);
    console.log("_tokenId :" + decodedData.args._tokenId.toString());
    

    var mysql      = require('mysql');
   var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'eth_event_log'
   });
 
   connection.connect();

var  addSql = 'INSERT INTO eth_users(Id,address) VALUES(0,?)';
var  addSqlParams = [decodedData.args._to];
   //增
  connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
 
       console.log('--------------------------INSERT----------------------------');
       //console.log('INSERT ID:',result.insertId);        
       console.log('INSERT ID:',result);        
       console.log('-----------------------------------------------------------------\n\n');  
});
 
connection.end();
 


}
 

async function main() {
    let [owner, second] = await ethers.getSigners();
    let myerc721 = await ethers.getContractAt("newNFT",
        "0x8eD56A342e0A92478831EFA1cE42a409B4394CF9",
        owner);

    let filter = myerc721.filters.Transfer()
    // 指定区块  限制2000
    filter.fromBlock = 10316191;
    filter.toBlock =  10316227;

  
    // let events = await myerc20.queryFilter(filter);
    let events = await ethers.provider.getLogs(filter);
    for (let i = 0; i < events.length; i++) {
        // console.log(events[i]);
        
        // 解析日志
       parseTransferEvent(events[i]);

    }
}

main()