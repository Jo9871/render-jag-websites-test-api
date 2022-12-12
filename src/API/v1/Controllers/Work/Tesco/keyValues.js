import moment from "moment";

import { keyValuesModel } from "../../../../../Config/Database Configs/Work/Schema/Tesco/keyValues.js";
import { keyValuesUpdate } from "../../../../../Services/getKeyValues.js";
import { formatCurrency } from "../../../Helpers/formatter.js";
import {
  error as errorFunc, success as successFunc
} from "../../../Helpers/sendResponse.js";
import { getTimeBetween } from "../../../Helpers/utils.js";

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

// Updates the Key Values entry in Mongo Database using Sheetly API that is connected to Main Financial Tracker Google Sheet.
export const updateKeyValues = async (req, res) => {
  try {
    const response = await keyValuesUpdate()
    res.status(200).json({
      success: true,
      message: `The request has successfully ran, and the Key Figures has been updated. The old and new figures are shown below.`,
      keyFigures: response
    });
  } catch (error) {
    // errorFunc(res, res, 200, error);
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
