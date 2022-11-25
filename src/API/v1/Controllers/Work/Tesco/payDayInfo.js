import moment from "moment";

import {
  success as successFunc,
  error as errorFunc,
} from "../../../Helpers/sendResponse.js";
import { formatCurrency } from "../../../Helpers/formatter.js";
import { getTimeBetween } from "../../../Helpers/utils.js";
import { shiftModel } from "../../../../../Config/Database Configs/Work/Schema/Tesco/shiftSchema.js";

// Returns all Expense Transaction in the database in an array of transaction objects.
export const getPayDayInfo = async (req, res) => {
  try {
    let firstPayDay = new Date("2021-10-15");
    let nextPayDay = new Date("2021-10-15");

    while (nextPayDay < new Date()) {
      if (nextPayDay == firstPayDay) {
        nextPayDay = new Date(
          firstPayDay.setDate(new Date(firstPayDay.getDate() + 28))
        );
      } else {
        nextPayDay = new Date(
          firstPayDay.setDate(new Date(firstPayDay.getDate() + 28))
        );
      }
    }

    // successFunc(req, res, 200, {
    //   nextPayDay: {
    //     noFormatting: nextPayDay,
    //     shortHand: moment(nextPayDay).format("DD/MM/YY"),
    //     longHand: moment(nextPayDay).format("dddd Do MMMM YYYY"),
    //   },
    //   timeRemaining: { ...getTimeBetween(nextPayDay) },
    // });

    res.status(200).json({
      estimatedPay: await getEstimatedPay(nextPayDay),
      nextPayDay: {
        noFormatting: nextPayDay,
        shortHand: moment(nextPayDay).format("DD/MM/YY"),
        longHand: moment(nextPayDay).format("dddd Do MMMM YYYY"),
      },
      timeRemaining: { ...getTimeBetween(new Date(), nextPayDay) },
    });
  } catch (error) {
    // errorFunc(res, res, 200, error);
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};

async function getEstimatedPay(nextPayDay) {
  const tescoShifts = await shiftModel.find({
    "shiftPayPeriodInfo.shiftPayDay": new Date(nextPayDay),
  });

  let shiftsTotalPay = tescoShifts.map((shift) => {
    return shift.shiftPay.totalShiftPay.totalHoursPay.number;
  });

  let estimatedPay = 0;

  for (const shiftPay of shiftsTotalPay) {
    estimatedPay = estimatedPay + shiftPay;
  }

  return {
    number: estimatedPay,
    currencyNumber: formatCurrency("£", estimatedPay),
  };
}
