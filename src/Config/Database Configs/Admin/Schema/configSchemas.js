import mongoose from "mongoose";

import { adminConnection } from "../adminWebsiteConnections.js";

const tescoConfigsSchema = mongoose.Schema({
  contractedHours: {
    monday: Number,
    tuesday: Number,
    wednesday: Number,
    thursday: Number,
    friday: Number,
    saturday: Number,
    sunday: Number,
  },
  currentBaseRate: Number,
  baseRateMultiplier: {
    monday: Number,
    tuesday: Number,
    wednesday: Number,
    thursday: Number,
    friday: Number,
    saturday: Number,
    sunday: Number,
  },
});

const config2Schema = mongoose.Schema({
  name2: String,
});

export const tescoConfigsModel = adminConnection.model(
  "configs-tescoConfigs",
  tescoConfigsSchema
);

// module.exports = {
//     expenseModel
// };
