import mongoose from "mongoose";

import { transactionsConnection } from "../../financialWebsiteConnections.js";

const expensesSchema = mongoose.Schema({
  transactionDate: Date,
  expenseCategory: String,
  moneyPocket: String,
  expenseVendor: String,
  expenseDescription: String,
  expenseCost: {
    number: Number,
    currencyNumber: String,
  },
});

export const expensesModel = transactionsConnection.model(
  "expense-transactions",
  expensesSchema
);

// module.exports = {
//     expensesModel
// };
