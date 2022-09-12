
//for node test uncomment below line 
//for web test comment the below line
// var Web3 = require('web3');
console.log('api.eth.serivce.js started!!!');
const Config = {
   "infura_url" : "https://mainnet.infura.io/v3/663c5367768841e69a080f3a71f8c93e",
   "base_url" : "file:///Users/mahagoms/Desktop/EthereumDemo/Web3project/web3pro1/EthereumSearch/",
}
//let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
let infura = Config.infura_url;
let infura_web3 = new Web3(infura);

//for test later remove the below line 
//infura_web3.eth.getBlockNumber().then(console.log);

//to test : 
//getBlockByNumber(15496660).then(console.log);
//get block by block id
async function getBlockByNumber(blockNumber) {
   let block;
   await infura_web3.eth.getBlock(blockNumber).then((result) => {
      block = result;
   });
   return block;
}

//to test : 
//GetRecentNBlocks(1).then(console.log);
//get recent 'n' numbers block list
async function GetRecentNBlocks(limit) {
   let blockList = [];
   latestBlockNumber = await infura_web3.eth.getBlockNumber();
   // console.log("Latest block number (total count) =>", latestBlockNumber);
   for (let i = 0; i < limit; i++) {
      await infura_web3.eth.getBlock(latestBlockNumber - i)
         .then((block) => {
            blockList.push(block);
         });
   }
   return blockList;
}

//to test : 
//set loop is : for (let i = latestBlockNumber-2; i < latestBlockNumber; i++) {
//GetAllBlocks().then(console.log);
//get all blocks list
async function GetAllBlocks() {
   let blockList = [];
   latestBlockNumber = await infura_web3.eth.getBlockNumber();
   // console.log("Latest block number (total count) =>", latestBlockNumber);
   for (let i = 0; i < latestBlockNumber; i++) {
      await infura_web3.eth.getBlock(latestBlockNumber - i)
         .then((block) => {
            blockList.push(block);
         });
   }
   return blockList;
}

//to test :
//GetRecentTransactionByRecentBlock(15496660).then(console.log);
//get recent transaction list by recent block 
async function GetRecentTransactionByRecentBlock(recentBlockNumber,limit = 0) {
   let transactionList = [];
   //  console.log("Latest transaction block number =>", recentBlockNumber);
   var _blockTransactionCount = 0;
   await infura_web3.eth.getBlockTransactionCount(recentBlockNumber)
      .then((count) => {
         _blockTransactionCount = count;
      });
   for (let i = 0; i < (limit > 0 ? limit: _blockTransactionCount); i++) {
      await infura_web3.eth.getTransactionFromBlock(recentBlockNumber,_blockTransactionCount-i).then((trans)=>{
         transactionList.push(trans);
      });
   }
   return transactionList;
}

//to test:
//set loop is for (let i = 0; i < 1; i++) {
//GetAllTransactionByAllBlock().then(console.log);
//get all transaction list by all block 
async function GetAllTransactionByAllBlock() {
   let blockTransactionList = [];
   latestBlockNumber = await infura_web3.eth.getBlockNumber();
   // console.log("Latest block number (total count) =>", latestBlockNumber);
   for (let i = 0; i < latestBlockNumber; i++) {
      await GetRecentTransactionByRecentBlock(latestBlockNumber - i).then((result)=>{
         blockTransactionList.push(result);
      });
   }
   return blockTransactionList;
}

//to test:
//set loop is for (let i = 0; i < 1; i++) {
//GetTransactionByHash("0xa9fd05434a3ae3397d978b71587479f043b5bd510b21c41c69ee57c4b4dbf8ad").then(console.log);
//get all transaction list by all block 
async function GetTransactionByHash(transHash){
   let transaction = {};
   await infura_web3.eth.getTransaction(transHash).then((result)=>{
      transaction = result;
   })
   return transaction;
}





