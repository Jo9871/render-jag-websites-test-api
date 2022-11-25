import mongoose from "mongoose";

import { transactionsConnection } from "../../financialWebsiteConnections.js";

const paySlipSchema = mongoose.Schema({});

export const paySlipsModel = transactionsConnection.model(
  "pay-slips",
  paySlipSchema
);

// module.exports = {
//     paySlipsModel
// };
