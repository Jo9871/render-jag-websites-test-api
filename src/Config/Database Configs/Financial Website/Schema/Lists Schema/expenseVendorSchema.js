import mongoose from "mongoose";

import { listsConnection } from "../../financialWebsiteConnections.js";

const expenseVendorSchema = mongoose.Schema({
  name: String
});

export const expenseVendorModel = listsConnection.model(
  "expense-vendors",
  expenseVendorSchema
);

// module.exports = {
//     expenseVendorsModel
// };
