const express = require("express");
const transactions = express.Router();
let transactionsArray = require("../models/transactions");

transactions.get("/", (req, res) => {
    const { order, amount } = req.query;
    let sortedTransactions = [...transactionsArray];
  
    if (order) {
      if (order === "asc") {
        sortedTransactions.sort((a, b) => a.itemName.localeCompare(b.itemName));
        res.send(sortedTransactions);
      } else if (order === "desc") {
        sortedTransactions.sort((a, b) => b.itemName.localeCompare(a.itemName));
        res.send(sortedTransactions);
      }
    }

    if (amount) {
      const match = amount.match(/(.*?)([0-9]+)/);
  
      if (match) {
        const operator = match[1];
        const value = parseInt(match[2], 10);
  
        if (operator === "gt") {
          sortedTransactions = sortedTransactions.filter(transaction => transaction.amount > value);
          res.json(sortedTransactions)
        } else if (operator === "gte") {
          sortedTransactions = sortedTransactions.filter(transaction => transaction.amount >= value);
          res.json(sortedTransactions)
        } else if (operator === "lt") {
          sortedTransactions = sortedTransactions.filter(transaction => transaction.amount < value);
          res.json(sortedTransactions)
        } else if (operator === "lte") {
          sortedTransactions = sortedTransactions.filter(transaction => transaction.amount <= value);
          res.json(sortedTransactions)
        }
      }
    }
  
      res.send(transactionsArray);
  });

module.exports = transactions;