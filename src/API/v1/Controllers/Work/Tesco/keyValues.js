import moment from "moment";

import {
  success as successFunc,
  error as errorFunc,
} from "../../../Helpers/sendResponse.js";
import { formatCurrency } from "../../../Helpers/formatter.js";
import { getTimeBetween } from "../../../Helpers/utils.js";
import { keyValuesModel } from "../../../../../Config/Database Configs/Work/Schema/Tesco/keyValues.js";

// Returns all Expense Transaction in the database in an array of transaction objects.
export const getKeyValues = async (req, res) => {
  try {
    const keyValues = await keyValuesModel.findOne({
      _id: `62813dbfc05bcb9137994251`,
    });

    // console.log(keyValues);

    // successFunc(req, res, 200, {
    //   keyValues },
    // });

    res.status(200).json({
      estimatedNextPay: keyValues.estimatedNextPay,
      cashBalance: keyValues.cashBalance,
      natWestCurrentAccountBalance: keyValues.natWestCurrentAccountBalance,
      natWestSavingsAccountBalance: keyValues.natWestSavingsAccountBalance,
      fluidCreditCardBalance: keyValues.fluidCreditCardBalance,
      monzoCurrentAccountBalance: keyValues.monzoCurrentAccountBalance,
      totalBalanceOfAccounts: keyValues.totalBalanceOfAccounts,
    });
  } catch (error) {
    // errorFunc(res, res, 200, error);
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};

// Returns all Expense Transaction in the database in an array of transaction objects.
export const getEstimatedPay = async (req, res) => {
  try {
    const keyValues = await keyValuesModel.findOne({
      _id: `62813dbfc05bcb9137994251`,
    });

    // console.log(keyValues);

    // successFunc(req, res, 200, {
    //   keyValues },
    // });

    res.status(200).json({
      estimatedPay: keyValues.estimatedNextPay,
    });
  } catch (error) {
    // errorFunc(res, res, 200, error);
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
