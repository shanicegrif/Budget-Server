const express = require("express");
const transactions = require("./controllers/transactions.controller");

const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use("/transactions", transactions);

app.get("/", (req, res) => {
  res.send("Welcome to the budgeting app!");
});

app.use("/404", (req, res) => {
  res.status(404).json({ error: "Transaction could not be located." });
});

module.exports = app;
