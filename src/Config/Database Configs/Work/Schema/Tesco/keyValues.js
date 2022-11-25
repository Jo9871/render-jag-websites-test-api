import mongoose from "mongoose";

import { tescoConnection } from "../../workWebsiteConnections.js";

const keyValesSchema = mongoose.Schema({
  estimatedNextPay: {
    number: Number,
    currencyNumber: String,
  },
  cashBalance: {
    number: Number,
    currencyNumber: String,
  },
  natWestCurrentAccountBalance: {
    number: Number,
    currencyNumber: String,
  },
  natWestSavingsAccountBalance: {
    number: Number,
    currencyNumber: String,
  },
  fluidCreditCardBalance: {
    number: Number,
    currencyNumber: String,
  },
  monzoCurrentAccountBalance: {
    number: Number,
    currencyNumber: String,
  },
  totalBalanceOfAccounts: {
    number: Number,
    currencyNumber: String,
  },
});

export const keyValuesModel = tescoConnection.model(
  "kay-values",
  keyValesSchema
);

// module.exports = {
//     keyValuesModel
// };
