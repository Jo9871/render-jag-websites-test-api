import { expenseVendorModel } from "../../../../../Config/Database Configs/Financial Website/Schema/Lists Schema/expenseVendorSchema.js";
import moment from "moment";

// Returns all expense vendors in the database in an array of expense category objects.
export const getExpenseVendors = async (req, res) => {
  try {
    const list = await expenseVendorModel.find({});

    let listInfo = { listCount: list.length };

    res.status(200).json({
      message: `Below is a list of all expense vendors found within the database.`,
      listInfo,
      list,
    });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
// Accepts a JSON object and creates new expense vendors object in database with it.
export const createExpenseVendor = async (req, res) => {
  try {
    const expenseVendorToCreate = req.body;
    // console.log({message:`API Call req.body`,transactionToCreate})
    const newExpenseVendor = new expenseVendorModel({
      ...expenseVendorToCreate,
    });

    newExpenseVendor
      .save()
      .then((data) => {
        // console.log(`Transaction [${data._id}] added to the database.`);
        res.status(201).json({
          message: `Expense vendor [${data._id}] added to the database.`,
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
// Returns single expense vendor from the database using a provided ID.
export const getExpenseVendor = async (req, res) => {
  try {
    const expenseVendorId = req.params.id;
    if (!expenseVendorId)
      return res.status(404).json({
        message: `The expense vendor ID has not been supplied.`,
        helpMessage: `Please include the expense vendor ID.`,
      });

    const expenseVendor = await expenseVendorModel.findOne({
      _id: expenseVendorId,
    });
    if (!expenseVendor)
      return res.status(404).json({
        message: `Expense vendor with id of [${expenseVendorId}] does not exist in the database.`,
        helpMessage: `Please try using another ID.`,
      });

    res.status(200).json({
      message: `Expense vendor with ID [${expenseVendorId}] has been found in the database.`,
      transaction: expenseVendor,
    });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
// Deletes single expense vendor from the database using a provided ID.
export const deleteExpenseVendor = async (req, res) => {
  try {
    const expenseVendorId = req.params.id;
    if (!expenseVendorId)
      return res.status(404).json({
        message: `The expense vendor ID has not been supplied.`,
        helpMessage: `Please include the expense vendor ID.`,
      });

    const expenseVendor = await expenseVendorModel.findOne({
      _id: expenseVendorId,
    });
    if (!expenseVendor)
      return res.status(404).json({
        message: `Expense vendor with id of [${expenseVendorId}] does not exist in the database.`,
        helpMessage: `Please try using another ID.`,
      });

    const removedExpenseVendor = await expenseVendorModel.deleteOne({
      _id: expenseVendorId,
    });
    res.status(200).json({
      message: `Expense vendor with ID [${expenseVendorId}] has been removed from the database.`,
      removedExpenseVendorInfo: {
        removedExpenseVendor: removedExpenseVendor,
        deletedExpenseVendor: expenseVendor,
      },
    });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
// Updates single expense vendor item using a provided ID. Can update multiple or single part of object.
export const updateExpenseVendor = async (req, res) => {
  try {
    const expenseVendorUpdates = req.body;
    const expenseVendorId = req.params.id;
    if (!expenseVendorId)
      return res.status(404).json({
        message: `The expense vendor ID has not been supplied.`,
        helpMessage: `Please include the expense vendor ID.`,
      });

    const expenseVendor = await expenseVendorModel.findOne({
      _id: expenseVendorId,
    });
    if (!expenseVendor)
      return res.status(404).json({
        message: `Expense vendor with id of [${expenseVendorId}] does not exist in the database.`,
        helpMessage: `Please try using another ID.`,
      });

    if (expenseVendorUpdates.name) {
      expenseVendor.name = expenseVendorUpdates.name;
    }

    expenseVendor
      .save()
      .then((data) => {
        // console.log(`expenseVendor [${data._id}] added to the database.`);
        res.status(200).json({
          message: `Expense vendor [${data._id}] has been update and saved to the database.`,
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
