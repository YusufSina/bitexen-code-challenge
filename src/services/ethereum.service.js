const  InputDataDecoder = require("ethereum-input-data-decoder");
const Web3 = require('web3');
const { TREASURY_WALLET } = require("../config");
const { unitByDecimal } = require("../helpers");

const ethereumService = {
  getTransactions: async ({fromBlock, toBlock, walletAddress, tokenContract}) => {
    const decoder = new InputDataDecoder(tokenContract.ABI);
    const web3 = new Web3(process.env.INFURA_URL);

    const tetherContract = new web3.eth.Contract(tokenContract.ABI, tokenContract.ADDRESS);
    
    let sendTransfers = await tetherContract.getPastEvents("Transfer", {
      filter: { from: TREASURY_WALLET },
      fromBlock: 14450000,
      toBlock: 14650000,
    });

    sendTransfers = sendTransfers.map(m => ({ 
      txId: m.transactionHash, 
      from: m.returnValues.from, 
      to: m.returnValues.to, 
      amount: web3.utils.fromWei(m.returnValues.value, unitByDecimal[tokenContract.DECIMAL])
    }));

    let receivedTransfers = await tetherContract.getPastEvents("Transfer", {
      filter: { to: TREASURY_WALLET },
      fromBlock: 14450000,
      toBlock: 14650000,
    });

    receivedTransfers = receivedTransfers.map(m => ({ 
      txId: m.transactionHash, 
      from: m.returnValues.from, 
      to: m.returnValues.to, 
      amount: web3.utils.fromWei(m.returnValues.value, unitByDecimal[tokenContract.DECIMAL])
    }));

    let transfers = sendTransfers.concat(receivedTransfers);

    const promises = [];

    for (let i = 0; i < transfers.length; i++) {
      promises.push(web3.eth.getTransaction(transfers[i].txId));
    }

    const txDetails = await Promise.all(promises);

    console.log(txDetails);

  // return result;
  return transfers
  }
}

module.exports = ethereumService;