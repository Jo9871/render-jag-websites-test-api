import mongoose from 'mongoose'

import { transactionsConnection } from "../../financialWebsiteConnections.js";

const incomeSchema = mongoose.Schema({
transactionDate: Date,
  incomeCategory: String,
  moneyPocket: String,
  incomeSource: String,
  incomeDescription: String,
  incomeAmount: {
    number: Number,
    currencyNumber: String,
  },
})


export const incomeModel = transactionsConnection.model('income-transactions', incomeSchema);

// module.exports = {
//     incomeModel
// };