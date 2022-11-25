import moment from "moment";

import { incomeModel } from "../../../../../Config/Database Configs/Financial Website/Schema/Transactions Schema/incomeSchema.js";
import { expensesModel } from "../../../../../Config/Database Configs/Financial Website/Schema/Transactions Schema/expensesSchema.js";
import { transferModel } from "../../../../../Config/Database Configs/Financial Website/Schema/Transactions Schema/transferSchema.js";

import { moneyPocketModel } from "../../../../../Config/Database Configs/Financial Website/Schema/Lists Schema/moneyPocketSchema.js";
import { incomeCategoryModel } from "../../../../../Config/Database Configs/Financial Website/Schema/Lists Schema/incomeCategorySchema.js";
import { incomeSourceModel } from "../../../../../Config/Database Configs/Financial Website/Schema/Lists Schema/incomeSourceSchema.js";
import { expenseCategoryModel } from "../../../../../Config/Database Configs/Financial Website/Schema/Lists Schema/expenseCategorySchema.js";
import { expenseVendorModel } from "../../../../../Config/Database Configs/Financial Website/Schema/Lists Schema/expenseVendorSchema.js";

import { success, error as errorFunc } from "../../../Helpers/sendResponse.js";
import { formatCurrency } from "../../../Helpers/formatter.js";

// Returns all Expense Transaction in the database in an array of transaction objects.
export const getAllFilteredTotals = async (req, res) => {
  try {
    const moneyPockets = await moneyPocketModel.find({});

    let moneyPocketTotals = {};

    for (let i = 0; i < moneyPockets.length; i++) {
      let moneyPocketName = moneyPockets[i].name;

      let moneyPocketIncomeTransactions = await incomeModel.find({
        moneyPocket: moneyPocketName,
      });
      let moneyPocketExpenseTransactions = await expensesModel.find({
        moneyPocket: moneyPocketName,
      });

      let incomeTotal = 0;
      moneyPocketIncomeTransactions.forEach((transaction) => {
        incomeTotal = incomeTotal + transaction.incomeAmount.number;
      });

      let expenseTotal = 0;
      moneyPocketExpenseTransactions.forEach((transaction) => {
        expenseTotal = expenseTotal + transaction.expenseCost.number;
      });

      moneyPocketTotals = {
        ...moneyPocketTotals,
        [`${moneyPocketName} Totals`]: {
          incomeTransactions: {
            count: moneyPocketIncomeTransactions.length,
            totalAmount: formatCurrency("£", incomeTotal),
          },
          expenseTransactions: {
            count: moneyPocketExpenseTransactions.length,
            totalAmount: formatCurrency("£", 0 - expenseTotal),
          },
        },
      };
    }

    const incomeCategories = await incomeCategoryModel.find({});

    let incomeCategoryTotals = {};

    for (let i = 0; i < incomeCategories.length; i++) {
      let incomeCategoryName = incomeCategories[i].name;

      let incomeCategoryIncomeTransactions = await incomeModel.find({
        incomeCategory: incomeCategoryName,
      });

      let incomeTotal = 0;
      incomeCategoryIncomeTransactions.forEach((transaction) => {
        incomeTotal = incomeTotal + transaction.incomeAmount.number;
      });
      incomeCategoryTotals = {
        ...incomeCategoryTotals,
        [`${incomeCategoryName} Totals`]: {
          incomeTransactions: {
            count: incomeCategoryIncomeTransactions.length,
            totalAmount: formatCurrency("£", incomeTotal),
          },
          expenseTransactions: {
            count: 0,
            totalAmount: formatCurrency("£", 0),
          },
        },
      };
    }

    const incomeSources = await incomeSourceModel.find({});

    let incomeSourcesTotals = {};

    for (let i = 0; i < incomeSources.length; i++) {
      let incomeSourceName = incomeSources[i].name;

      let incomeSourceIncomeTransactions = await incomeModel.find({
        incomeSource: incomeSourceName,
      });

      let incomeTotal = 0;
      incomeSourceIncomeTransactions.forEach((transaction) => {
        incomeTotal = incomeTotal + transaction.incomeAmount.number;
      });
      incomeSourcesTotals = {
        ...incomeSourcesTotals,
        [`${incomeSourceName} Totals`]: {
          incomeTransactions: {
            count: incomeSourceIncomeTransactions.length,
            totalAmount: formatCurrency("£", incomeTotal),
          },
          expenseTransactions: {
            count: 0,
            totalAmount: formatCurrency("£", 0),
          },
        },
      };
    }

    const expenseCategories = await expenseCategoryModel.find({});

    let expenseCategoryTotals = {};

    for (let i = 0; i < expenseCategories.length; i++) {
      let expenseCategoryName = expenseCategories[i].name;

      let expenseCategoryExpenseTransactions = await expensesModel.find({
        expenseCategory: expenseCategoryName,
      });

      let expenseTotal = 0;
      expenseCategoryExpenseTransactions.forEach((transaction) => {
        expenseTotal = expenseTotal + transaction.expenseCost.number;
      });

      expenseCategoryTotals = {
        ...expenseCategoryTotals,
        [`${expenseCategoryName} Totals`]: {
          incomeTransactions: {
            count: 0,
            totalAmount: formatCurrency("£", 0),
          },
          expenseTransactions: {
            count: expenseCategoryExpenseTransactions.length,
            totalAmount: formatCurrency("£", 0 - expenseTotal),
          },
        },
      };
    }

    const expenseVendors = await expenseVendorModel.find({});

    let expenseVendorTotals = {};

    for (let i = 0; i < expenseVendors.length; i++) {
      let expenseVendorName = expenseVendors[i].name;

      let expenseVendorExpenseTransactions = await expensesModel.find({
        expenseVendor: expenseVendorName,
      });

      let expenseTotal = 0;
      expenseVendorExpenseTransactions.forEach((transaction) => {
        expenseTotal = expenseTotal + transaction.expenseCost.number;
      });

      expenseVendorTotals = {
        ...expenseVendorTotals,
        [`${expenseVendorName} Totals`]: {
          incomeTransactions: {
            count: 0,
            totalAmount: formatCurrency("£", 0),
          },
          expenseTransactions: {
            count: expenseVendorExpenseTransactions.length,
            totalAmount: formatCurrency("£", 0 - expenseTotal),
          },
        },
      };
    }

    let filteredTransactionTotals = {
      moneyPocketTotals,
      incomeCategoryTotals,
      incomeSourcesTotals,
      expenseCategoryTotals,
      expenseVendorTotals,
    };

    res.status(200).json({ filteredTransactionTotals });
  } catch (err) {
    // errorFunc(res, req, 200, err);
    res.status(400).json({ message: `Error`, errorMessage: err });
  }
};
// // Accepts a JSON object and create new Transaction object in database with it.
// export const createExpenseTransaction = async (req, res) => {
//   try {

//   } catch (error) {
//     // errorFunc(res, res, 200, error);
//     res.status(400).json({ message: `Error`, errorMessage: error });
//   }
// };
// // Returns single Expense Transaction in the database using a provided transaction ID.
// export const getExpenseTransaction = async (req, res) => {
//   try {

//   } catch (error) {
//     // errorFunc(res, res, 200, error);
//     res.status(400).json({ message: `Error`, errorMessage: error });
//   }
// };
// // Deletes single Expense Transaction in the database using a provided transaction ID.
// export const deleteExpenseTransaction = async (req, res) => {
//   try {

//   } catch (error) {
//     // errorFunc(res, res, 200, error);
//     res.status(400).json({ message: `Error`, errorMessage: error });
//   }
// };
// // Updates single transaction using a provided transaction ID. Can update multiple or single part of object.
// export const updateExpenseTransaction = async (req, res) => {
//   try {

//   } catch (error) {
//     // errorFunc(res, res, 200, error);
//     res.status(400).json({ message: `Error`, errorMessage: error });
//   }
// };
