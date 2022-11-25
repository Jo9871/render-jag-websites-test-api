import mongoose from "mongoose";

import { transactionsConnection } from "../../financialWebsiteConnections.js";

const incomeSchema = mongoose.Schema({
  dates: {
    submitDate: { type: Date, default: Date.now() },
    transactionDate: {
      standard: Date,
      shortFormat: String,
      longFormat: String,
    },
  },
  category: {
    mainCategory: String,
    subCategory: String,
  },
  moneyPocket: String,
  incomeSource: String,
  incomeDescription: String,
  incomeAmount: {
    number: Number,
    currencyNumber: String,
  },
});

const expensesSchema = mongoose.Schema({
  dates: {
    submitDate: { type: Date, default: Date.now() },
    transactionDate: {
      standard: Date,
      shortFormat: String,
      longFormat: String,
    },
  },
  category: {
    mainCategory: String,
    subCategory: String,
  },
  moneyPocket: String,
  expenseVendor: String,
  expenseDescription: String,
  expenseCost: {
    number: Number,
    currencyNumber: String,
  },
});

const transferSchema = mongoose.Schema({
  dates: {
    submitDate: { type: Date, default: Date.now() },
    transactionDate: {
      standard: Date,
      shortFormat: String,
      longFormat: String,
    },
  },
  moneyPocketInfo: {
    from: String,
    to: String,
  },
  transferAmount: {
    number: Number,
    currencyNumber: String,
  },
});

export const incomeModel = transactionsConnection.model(
  "income-transactions",
  incomeSchema
);
export const expensesModel = transactionsConnection.model(
  "expense-transactions",
  expensesSchema
);
export const transferModel = transactionsConnection.model(
  "transfer-transactions",
  transferSchema
);

// module.exports = {
//     expensesModel
// };
