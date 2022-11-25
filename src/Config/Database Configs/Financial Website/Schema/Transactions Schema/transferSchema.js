import mongoose from 'mongoose'

import { transactionsConnection } from "../../financialWebsiteConnections.js";

const transferSchema = mongoose.Schema({
    transactionDate: Date,
  moneyPocketInfo: {
      from: String,
      to: String,
  },
  transferAmount: {
    number: Number,
    currencyNumber: String,
  },
})


export const transferModel = transactionsConnection.model('transfer-transactions', transferSchema);

// module.exports = {
//     transferModel
// };