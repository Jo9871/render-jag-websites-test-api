import { expensesModel } from "../../../../../Config/Database Configs/Financial Website/Schema/Transactions Schema/expensesSchema.js";
import moment from "moment";

import { success, error as errorFunc } from "../../../Helpers/sendResponse.js";
import { formatCurrency } from "../../../Helpers/formatter.js";

// Returns all Expense Transaction in the database in an array of transaction objects.
export const getExpenseTransactions = async (req, res) => {
  try {
    const transactions = await expensesModel
      .find({})
      .sort({ transactionDate: -1 });

    let transactionInfo = { transactionCount: transactions.length };

    let resJson = {
      message: `Below is a list of all expense transactions found within the database.`,
      transactionInfo,
      transactions,
    };
    // success(res, res, 200, resJson);
    res.status(200).json({
      message: `Below is a list of all expense transactions found within the database.`,
      transactionInfo,
      transactions,
    });
  } catch (error) {
    // errorFunc(res, res, 200, error);
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
// Accepts a JSON object and create new Transaction object in database with it.
export const createExpenseTransaction = async (req, res) => {
  try {
    const transactionToCreate = req.body;
    // console.log({message:`API Call req.body`,transactionToCreate})
    const newTransaction = new expensesModel({
      ...transactionToCreate,
    });

    newTransaction
      .save()
      .then((data) => {
        // console.log(`Transaction [${data._id}] added to the database.`);
        res.status(201).json({
          message: `Transaction [${data._id}] added to the database.`,
          data,
        });
      })
      .catch((err) => {
        res.status(400).json({ message: `Error`, errorMessage: err });
      });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
// Returns single Expense Transaction in the database using a provided transaction ID.
export const getExpenseTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    if (!transactionId)
      return res.status(404).json({
        message: `The transaction ID has not been supplied.`,
        helpMessage: `Please include the transaction ID.`,
      });

    const transaction = await expensesModel.findOne({ _id: transactionId });
    if (!transaction)
      return res.status(404).json({
        message: `Expense transaction with id of [${transactionId}] does not exist in the database.`,
        helpMessage: `Please try using another ID.`,
      });

    res.status(200).json({
      message: `Transaction with ID [${transactionId}] has been found in the database.`,
      transaction,
    });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
// Deletes single Expense Transaction in the database using a provided transaction ID.
export const deleteExpenseTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    if (!transactionId)
      return res.status(404).json({
        message: `The transaction ID has not been supplied.`,
        helpMessage: `Please include the transaction ID.`,
      });

    const transaction = await expensesModel.findOne({ _id: transactionId });
    if (!transaction)
      return res.status(404).json({
        message: `Expense transaction with id of [${transactionId}] does not exist in the database.`,
        helpMessage: `Please try using another ID.`,
      });

    const removedTransaction = await expensesModel.deleteOne({
      _id: transactionId,
    });
    res.status(200).json({
      message: `Expense transaction with ID [${transactionId}] has been removed from the database.`,
      removedTransactionInfo: {
        removedTransaction,
        deletedTransaction: transaction,
      },
    });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
// Updates single transaction using a provided transaction ID. Can update multiple or single part of object.
export const updateExpenseTransaction = async (req, res) => {
  try {
    const transactionUpdates = req.body;
    const transactionId = req.params.id;
    if (!transactionId)
      return res.status(404).json({
        message: `The transaction ID has not been supplied.`,
        helpMessage: `Please include the transaction ID.`,
      });

    const transaction = await expensesModel.findOne({ _id: transactionId });
    if (!transaction)
      return res.status(404).json({
        message: `Expense transaction with id of [${transactionId}] does not exist in the database.`,
        helpMessage: `Please try using another ID.`,
      });

    if (transactionUpdates.transactionDate) {
      transaction.transactionDate = transactionUpdates.transactionDate;
    }
    if (transactionUpdates.expenseCategory) {
      transaction.expenseCategory = transactionUpdates.expenseCategory;
    }
    if (transactionUpdates.moneyPocket) {
      transaction.moneyPocket = transactionUpdates.moneyPocket;
    }
    if (transactionUpdates.expenseVendor) {
      transaction.expenseVendor = transactionUpdates.expenseVendor;
    }
    if (transactionUpdates.expenseDescription) {
      transaction.expenseDescription = transactionUpdates.expenseDescription;
    }
    if (transactionUpdates.expenseCost) {
      transaction.expenseCost = transactionUpdates.expenseCost;
    }

    transaction
      .save()
      .then((data) => {
        // console.log(`Transaction [${data._id}] added to the database.`);
        res.status(200).json({
          message: `Transaction [${data._id}] has been update and saved to the database.`,
          newData: data,
        });
      })
      .catch((err) => {
        res.status(400).json({ message: `Error`, errorMessage: err });
      });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
