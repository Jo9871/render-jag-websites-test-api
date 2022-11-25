import { transferModel } from "../../../../../Config/Database Configs/Financial Website/Schema/Transactions Schema/transferSchema.js";
import moment from "moment";

// Returns all Transfer Transaction in the database in an array of transaction objects.
export const getTransferTransactions = async (req, res) => {
  try {
    const transactions = await transferModel
      .find({})
      .sort({ transactionDate: -1 });

    let transactionInfo = { transactionCount: transactions.length };

    res.status(200).json({
      message: `Below is a list of all transfer transactions found within the database.`,
      transactionInfo,
      transactions,
    });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
// Accepts a JSON object and create new Transaction object in database with it.
export const createTransferTransaction = async (req, res) => {
  const transactionToCreate = req.body;
  // console.log({message:`API Call req.body`,transactionToCreate})
  const newTransaction = new transferModel({
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
};
// Returns single Transfer Transaction in the database using a provided transaction ID.
export const getTransferTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    if (!transactionId)
      return res.status(404).json({
        message: `The transaction ID has not been supplied.`,
        helpMessage: `Please include the transaction ID.`,
      });

    const transaction = await transferModel.findOne({ _id: transactionId });
    if (!transaction)
      return res.status(404).json({
        message: `Transfer transaction with id of [${transactionId}] does not exist in the database.`,
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
// Deletes single Transfer Transaction in the database using a provided transaction ID.
export const deleteTransferTransaction = async (req, res) => {
  const transactionId = req.params.id;
  if (!transactionId)
    return res.status(404).json({
      message: `The transaction ID has not been supplied.`,
      helpMessage: `Please include the transaction ID.`,
    });

  const transaction = await transferModel.findOne({ _id: transactionId });
  if (!transaction)
    return res.status(404).json({
      message: `Transfer transaction with id of [${transactionId}] does not exist in the database.`,
      helpMessage: `Please try using another ID.`,
    });

  try {
    const removedTransaction = await transferModel.deleteOne({
      _id: transactionId,
    });
    res.status(200).json({
      message: `Transfer transaction with ID [${transactionId}] has been removed from the database.`,
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
export const updateTransferTransaction = async (req, res) => {
  const transactionUpdates = req.body;
  const transactionId = req.params.id;
  if (!transactionId)
    return res.status(404).json({
      message: `The transaction ID has not been supplied.`,
      helpMessage: `Please include the transaction ID.`,
    });

  const transaction = await transferModel.findOne({ _id: transactionId });
  if (!transaction)
    return res.status(404).json({
      message: `Transfer transaction with id of [${transactionId}] does not exist in the database.`,
      helpMessage: `Please try using another ID.`,
    });

  if (transactionUpdates.transactionDate) {
    transaction.transactionDate = transactionUpdates.transactionDate;
  }
  if (transactionUpdates.moneyPocketInfo) {
    transaction.moneyPocketInfo = transactionUpdates.moneyPocketInfo;
  }
  if (transactionUpdates.TransferAmount) {
    transaction.TransferAmount = transactionUpdates.TransferAmount;
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
};
