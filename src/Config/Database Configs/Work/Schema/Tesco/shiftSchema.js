import mongoose from "mongoose";

import { tescoConnection } from "../../workWebsiteConnections.js";

const shiftSchema = mongoose.Schema({
  shiftDateInfo: {
    fullDate: Date,
    day: {
      string: String,
      number: Number,
    },
    date: {
      string: String,
      number: Number,
    },
    month: {
      string: String,
      number: Number,
    },
    year: Number,
  },
  shiftPayPeriodInfo: {
    shiftPayDay: Date,
    payPeriod: {
      start: Date,
      end: Date,
    },
  },
  shiftTiming: {
    payedShiftTime: Number,
    shiftHours: {
      totalShiftTime: Number,
      shiftStart: Date,
      shiftEnd: Date,
    },
    breakHours: {
      totalBreakTime: Number,
      breakStart: Date,
      breakEnd: Date,
    },
  },
  shiftPay: {
    hourlyRate: {
      shiftBasePay: {
        number: Number,
        currencyNumber: String,
      },
      basePayMultiplier: { type: Number, default: 1 },
      shiftPay: {
        number: Number,
        currencyNumber: String,
      },
    },
    totalShiftPay: {
      baseHoursPay: {
        number: Number,
        currencyNumber: String,
      },
      premiumBaseHoursPay: {
        number: Number,
        currencyNumber: String,
      },
      overtimeHoursPay: {
        number: Number,
        currencyNumber: String,
      },
      premiumOvertimeHoursPay: {
        number: Number,
        currencyNumber: String,
      },
      totalHoursPay: {
        number: Number,
        currencyNumber: String,
      },
    },
  },
});

export const shiftModel = tescoConnection.model("tesco-shifts", shiftSchema);

// module.exports = {
//     shiftModel
// };
