const express = require('express');
const { dbService, ethereumService } = require('../../services');
const { Router, Request, Response } = express;
const { TREASURY_WALLET, USDT } = require('../../config');

module.exports = (route) => {
  route.get("/transaction", async (req, res) => {
    const txDetails = await ethereumService.getTransactions({ fromBlock: 14450000, toBlock: 14650000, walletAddress: TREASURY_WALLET, tokenContract: USDT });
    
    await dbService.transaction.add(txDetails.transfers);

    return res.json(txDetails).status(200);
  });
}