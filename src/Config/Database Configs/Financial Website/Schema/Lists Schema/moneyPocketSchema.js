import mongoose from "mongoose";

import { listsConnection } from "../../financialWebsiteConnections.js";

const moneyPocketSchema = mongoose.Schema({
  name: String
});

export const moneyPocketModel = listsConnection.model(
  "money-pockets",
  moneyPocketSchema
);

// module.exports = {
//     moneyPocketModel
// };
