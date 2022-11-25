import mongoose from "mongoose";

import { listsConnection } from "../../financialWebsiteConnections.js";

const incomeSourceSchema = mongoose.Schema({
  name: String
});

export const incomeSourceModel = listsConnection.model(
  "income-sources",
  incomeSourceSchema
);

// module.exports = {
//     incomeSourceModel
// };
