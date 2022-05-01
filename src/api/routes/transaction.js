const express = require('express');
const { dbService, ethereumService } = require('../../services');
const { Router, Request, Response } = express;
const { TREASURY_WALLET, USDT } = require('../../config');

module.exports = (route) => {
  route.get("/transaction", async (req, res) => {
    // const result = await dbService.transaction.add([{ to: '0x1', from: '0x2', amount: 1, fee: 0.01 }, { to: '0x1', from: '0x2', amount: 2, fee: 0.01 }, { to: '0x1', from: '0x2', amount: 3, fee: 0.01 }, { to: '0x1', from: '0x2', amount: 4, fee: 0.01 }, { to: '0x1', from: '0x2', amount: 5, fee: 0.01 }]);
    const result = await ethereumService.getTransactions({ fromBlock: 14450000, toBlock: 14650000, walletAddress: TREASURY_WALLET, tokenContract: USDT });
 
    return res.json(result).status(200);
  });
}