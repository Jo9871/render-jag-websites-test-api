import mongoose from "mongoose";

import { listsConnection } from "../../financialWebsiteConnections.js";

const expenseCategorySchema = mongoose.Schema({
  name: String
});

export const expenseCategoryModel = listsConnection.model(
  "expense-categories",
  expenseCategorySchema
);

// module.exports = {
//     expenseCategoryModel
// };
