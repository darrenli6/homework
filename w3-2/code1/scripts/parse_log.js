const { ethers, network } = require("hardhat");
 
const mysql = require("mysql");

function handleError(){
    getConn()
}

function getConn(){
    var db = null;
    var pingInterval = null;
    var set = {
　　　　host:'localhost',
　　　　user :'root',
　　　　password : '123456',
　　　　database : 'eth_event_log',
　　　　multipleStatements: true
　　};
    if(db !== null){
        db.destroy();
        db = null;
    }
    db = mysql.createConnection(set)
    db.connect(function(err){
        if (err){
            setTimeout(connect,2000)
        }
    });
    db.on('error', handleError)
    // 每个小时ping一次数据库，保持数据库连接状态
    clearInterval(pingInterval);
    pingInterval = setInterval(() => {
        console.log('ping...');
        db.ping((err) => {
            if (err) {
                console.log('ping error: ' + JSON.stringify(err));
            }
        });
    }, 3600000);
    return db;
}

/**
 * @param {number} type 1是所有数据，2是获取只取一条，3是count（*）
 *  */ 
function execute(sql, type = 1){
    var promise = new Promise(function (resolve, reject){
        var db = getConn();
        db.query(sql, function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ', err.message);
                return
            }
            var resultStr = JSON.stringify(result);
            var json = JSON.parse(resultStr);
            if(type == 1){
                resolve(json)
            }else if(type == 2){
                resolve(json[0])
            }else if(type == 3){
                resolve(json[0]['count(*)'])
            }
        });
        db.end()
    })
    promise.then(function (value){
        return value
    },function (value){})
    return promise
}

/**
 * 批量执行sql
 * @param {sql} sql sql语句
 * @param {array} sql_param  要操作的数据（数组）
 */
function many_execute(sql, sql_param){
    if (sql_param == ""){
        return
    }
    var db = getConn()
    db.query(sql, [sql_param], function(err, result){
        if(err){
            console.log('[SELECT ERROR] - ', err.message)
            return
        }
        // console.log(result);
        return result;
    })
    db.end()
}

/**
 * 删除
 * @param {str} table 表名
 * @param {str} delSr where语句
 */
function del(table, delSr){
    execute("delete from "+ table +" where "+ delSr)
}
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

/* 
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

*/
// @param {number} type 1是所有数据，2是获取只取一条，3是count（*）
var result =execute("SELECT * FROM  eth_users where address='"+decodedData.args._to+"'",1)
result.then(result => {
    console.log(result[0].id)

    var re=execute("SELECT * FROM eth_owner where tokenid='"+decodedData.args._tokenId.toString()+"'",1)
  // 遍历是否有 address tokenid 

    // 如果没有插入

    re.then(res1=>{
        //console.log(res1.length);
        if (res1.length==0){
            var addVal = [[result[0].id,decodedData.args._tokenId.toString()]];

            var ir=many_execute( "insert into eth_owner(userid,tokenid) values ?", addVal)  
        }else{
            // 如果有 删除 再插入

            del("eth_owner", "tokenid='"+decodedData.args._tokenId.toString()+"'") 
            var addVal = [[result[0].id,decodedData.args._tokenId.toString()]];

            var ir=many_execute( "insert into eth_owner(userid,tokenid) values ?", addVal)  

        }
    })
    

    


}).catch(error => console.log(error) )
 
 


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