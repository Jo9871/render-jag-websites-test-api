import { incomeCategoryModel } from "../../../../../Config/Database Configs/Financial Website/Schema/Lists Schema/incomeCategorySchema.js";
import moment from "moment";

// Returns all income categories in the database in an array of income category objects.
export const getIncomeCategories = async (req, res) => {
  try {
    const list = await incomeCategoryModel.find({});

    let listInfo = { listCount: list.length };

    res.status(200).json({
      message: `Below is a list of all income categories found within the database.`,
      listInfo,
      list,
    });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
// Accepts a JSON object and creates new income category object in database with it.
export const createIncomeCategory = async (req, res) => {
  try {
    const incomeCategoryToCreate = req.body;
    // console.log({message:`API Call req.body`,transactionToCreate})
    const newIncomeCategory = new incomeCategoryModel({
      ...incomeCategoryToCreate,
    });

    newIncomeCategory
      .save()
      .then((data) => {
        // console.log(`Transaction [${data._id}] added to the database.`);
        res.status(201).json({
          message: `Income category [${data._id}] added to the database.`,
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
// Returns single income category from the database using a provided ID.
export const getIncomeCategory = async (req, res) => {
  try {
    const incomeCategoryId = req.params.id;
    if (!incomeCategoryId)
      return res.status(404).json({
        message: `The income category ID has not been supplied.`,
        helpMessage: `Please include the income category ID.`,
      });

    const incomeCategory = await incomeCategoryModel.findOne({
      _id: incomeCategoryId,
    });
    if (!incomeCategory)
      return res.status(404).json({
        message: `Income category with id of [${incomeCategoryId}] does not exist in the database.`,
        helpMessage: `Please try using another ID.`,
      });

    res.status(200).json({
      message: `Income category with ID [${incomeCategoryId}] has been found in the database.`,
      transaction: incomeCategory,
    });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
// Deletes single income category from the database using a provided ID.
export const deleteIncomeCategory = async (req, res) => {
  try {
    const incomeCategoryId = req.params.id;
    if (!incomeCategoryId)
      return res.status(404).json({
        message: `The income category ID has not been supplied.`,
        helpMessage: `Please include the income category ID.`,
      });

    const incomeCategory = await incomeCategoryModel.findOne({
      _id: incomeCategoryId,
    });
    if (!incomeCategory)
      return res.status(404).json({
        message: `Income category with id of [${incomeCategoryId}] does not exist in the database.`,
        helpMessage: `Please try using another ID.`,
      });

    const removedIncomeCategory = await incomeCategoryModel.deleteOne({
      _id: incomeCategoryId,
    });
    res.status(200).json({
      message: `Income category with ID [${incomeCategoryId}] has been removed from the database.`,
      removedIncomeCategoryInfo: {
        removedIncomeCategory: removedIncomeCategory,
        deletedIncomeCategory: incomeCategory,
      },
    });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
// Updates single income category item using a provided ID. Can update multiple or single part of object.
export const updateIncomeCategory = async (req, res) => {
  try {
    const incomeCategoryUpdates = req.body;
    const incomeCategoryId = req.params.id;
    if (!incomeCategoryId)
      return res.status(404).json({
        message: `The income category ID has not been supplied.`,
        helpMessage: `Please include the income category ID.`,
      });

    const incomeCategory = await incomeCategoryModel.findOne({
      _id: incomeCategoryId,
    });
    if (!incomeCategory)
      return res.status(404).json({
        message: `Income category with id of [${incomeCategoryId}] does not exist in the database.`,
        helpMessage: `Please try using another ID.`,
      });

    if (incomeCategoryUpdates.name) {
      incomeCategory.name = incomeCategoryUpdates.name;
    }

    incomeCategory
      .save()
      .then((data) => {
        // console.log(`incomeCategory [${data._id}] added to the database.`);
        res.status(200).json({
          message: `Income category [${data._id}] has been update and saved to the database.`,
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
