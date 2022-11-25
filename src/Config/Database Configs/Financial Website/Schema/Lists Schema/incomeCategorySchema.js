import mongoose from "mongoose";

import { listsConnection } from "../../financialWebsiteConnections.js";

const incomeCategorySchema = mongoose.Schema({
  name: String
});

export const incomeCategoryModel = listsConnection.model(
  "income-categories",
  incomeCategorySchema
);

// module.exports = {
//     incomeCategoryModel
// };
