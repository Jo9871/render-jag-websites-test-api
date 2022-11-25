import { expenseCategoryModel } from "../../../../../Config/Database Configs/Financial Website/Schema/Lists Schema/expenseCategorySchema.js";
import moment from "moment";

// Returns all expense categories in the database in an array of expense category objects.
export const getExpenseCategories = async (req, res) => {
  try {
    const list = await expenseCategoryModel.find({});

    let listInfo = { listCount: list.length };

    res.status(200).json({
      message: `Below is a list of all expense categories found within the database.`,
      listInfo,
      list,
    });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
// Accepts a JSON object and creates new expense category object in database with it.
export const createExpenseCategory = async (req, res) => {
  try {
    const expenseCategoryToCreate = req.body;
    // console.log({message:`API Call req.body`,expenseCategoryToCreate})
    const newExpenseCategory = new expenseCategoryModel({
      ...expenseCategoryToCreate,
    });

    newExpenseCategory
      .save()
      .then((data) => {
        // console.log(`expenseCategory [${data._id}] added to the database.`);
        res.status(201).json({
          message: `Expense category [${data._id}] added to the database.`,
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
// Returns single expense category from the database using a provided ID.
export const getExpenseCategory = async (req, res) => {
  try {
    const expenseCategoryId = req.params.id;
    if (!expenseCategoryId)
      return res.status(404).json({
        message: `The expense category ID has not been supplied.`,
        helpMessage: `Please include the expense category ID.`,
      });

    const expenseCategory = await expenseCategoryModel.findOne({
      _id: expenseCategoryId,
    });
    if (!expenseCategory)
      return res.status(404).json({
        message: `Expense category with id of [${expenseCategoryId}] does not exist in the database.`,
        helpMessage: `Please try using another ID.`,
      });

    res.status(200).json({
      message: `Expense category with ID [${expenseCategoryId}] has been found in the database.`,
      expenseCategory: expenseCategory,
    });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
// Deletes single expense category from the database using a provided ID.
export const deleteExpenseCategory = async (req, res) => {
  try {
    const expenseCategoryId = req.params.id;
    if (!expenseCategoryId)
      return res.status(404).json({
        message: `The expense category ID has not been supplied.`,
        helpMessage: `Please include the expense category ID.`,
      });

    const expenseCategory = await expenseCategoryModel.findOne({
      _id: expenseCategoryId,
    });
    if (!expenseCategory)
      return res.status(404).json({
        message: `Expense category with id of [${expenseCategoryId}] does not exist in the database.`,
        helpMessage: `Please try using another ID.`,
      });

    const removedExpenseCategory = await expenseCategoryModel.deleteOne({
      _id: expenseCategoryId,
    });
    res.status(200).json({
      message: `Expense category with ID [${expenseCategoryId}] has been removed from the database.`,
      removedExpenseCategoryInfo: {
        removedExpenseCategory: removedExpenseCategory,
        deletedExpenseCategory: expenseCategory,
      },
    });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
// Updates single expense category item using a provided ID. Can update multiple or single part of object.
export const updateExpenseCategory = async (req, res) => {
  try {
    const expenseCategoryUpdates = req.body;
    const expenseCategoryId = req.params.id;
    if (!expenseCategoryId)
      return res.status(404).json({
        message: `The expense category ID has not been supplied.`,
        helpMessage: `Please include the expense category ID.`,
      });

    const expenseCategory = await expenseCategoryModel.findOne({
      _id: expenseCategoryId,
    });
    if (!expenseCategory)
      return res.status(404).json({
        message: `Expense expense category with id of [${expenseCategoryId}] does not exist in the database.`,
        helpMessage: `Please try using another ID.`,
      });

    if (expenseCategoryUpdates.name) {
      expenseCategory.name = expenseCategoryUpdates.name;
    }

    expenseCategory
      .save()
      .then((data) => {
        // console.log(`expenseCategory [${data._id}] added to the database.`);
        res.status(200).json({
          message: `Expense category [${data._id}] has been update and saved to the database.`,
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
