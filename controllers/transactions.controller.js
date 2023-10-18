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
        sortedTransactions = sortedTransactions.filter(
          (transaction) => transaction.amount > value
        );
        res.json(sortedTransactions);
      } else if (operator === "gte") {
        sortedTransactions = sortedTransactions.filter(
          (transaction) => transaction.amount >= value
        );
        res.json(sortedTransactions);
      } else if (operator === "lt") {
        sortedTransactions = sortedTransactions.filter(
          (transaction) => transaction.amount < value
        );
        res.json(sortedTransactions);
      } else if (operator === "lte") {
        sortedTransactions = sortedTransactions.filter(
          (transaction) => transaction.amount <= value
        );
        res.json(sortedTransactions);
      }
    }
  }

  res.send(transactionsArray);
});

transactions.get("/:index", (req, res) => {
  const { index } = req.params;

  if (transactionsArray[index]) {
    res.status(200).json(transactionsArray[index]);
  } else {
    res.redirect("/404");
  }
});

function validateTransaction(transaction) {
  if (
    typeof transaction.itemName === "string" &&
    typeof transaction.date === "string" &&
    typeof transaction.amount === "number" &&
    typeof transaction.from === "string" &&
    typeof transaction.category === "string"
  ) {
    return true;
  } else {
    return false;
  }
}

transactions.post("/", (req, res) => {
  const newTransaction = req.body;

  if (validateTransaction(newTransaction)) {
    transactionsArray.push(newTransaction);
    res.status(201).json(newTransaction);
  } else {
    res.status(400).send("Invalid transaction entry data type(s).");
  }
});

transactions.delete("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;

  if (transactionsArray[arrayIndex]) {
    const deleteTransaction = transactionsArray.splice(arrayIndex, 1);
    res.status(200).json(deleteTransaction[0]);
  } else {
    res.redirect("/404");
  }
});

transactions.put("/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params;
    const updatedTransaction = req.body;
  
    if (transactionsArray[arrayIndex] && validateTransaction(updatedTransaction)) {
      transactionsArray[arrayIndex] = updatedTransaction;
      res.status(200).json(updatedTransaction);
    } else if (!transactionsArray[arrayIndex]) {
      res.redirect("/404");
    } else {
      res.status(400).send("Invalid transaction entry data type(s).");
    }
  });

module.exports = transactions;
