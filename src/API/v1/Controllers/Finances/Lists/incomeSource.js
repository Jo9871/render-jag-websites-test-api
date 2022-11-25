import { incomeSourceModel } from "../../../../../Config/Database Configs/Financial Website/Schema/Lists Schema/incomeSourceSchema.js";
import moment from "moment";

// Returns all expense sources in the database in an array of expense source objects.
export const getIncomeSources = async (req, res) => {
  try {
    const list = await incomeSourceModel.find({});

    let listInfo = { listCount: list.length };

    res.status(200).json({
      message: `Below is a list of all expense sources found within the database.`,
      listInfo,
      list,
    });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
// Accepts a JSON object and creates new expense source object in database with it.
export const createIncomeSource = async (req, res) => {
  try {
    const incomeSourceToCreate = req.body;
    // console.log({message:`API Call req.body`,transactionToCreate})
    const newIncomeSource = new incomeSourceModel({
      ...incomeSourceToCreate,
    });

    newIncomeSource
      .save()
      .then((data) => {
        // console.log(`Transaction [${data._id}] added to the database.`);
        res.status(201).json({
          message: `Income source [${data._id}] added to the database.`,
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
// Returns single expense source from the database using a provided ID.
export const getIncomeSource = async (req, res) => {
  try {
    const incomeSourceId = req.params.id;
    if (!incomeSourceId)
      return res.status(404).json({
        message: `The income source ID has not been supplied.`,
        helpMessage: `Please include the income source ID.`,
      });

    const incomeSource = await incomeSourceModel.findOne({
      _id: incomeSourceId,
    });
    if (!incomeSource)
      return res.status(404).json({
        message: `Income Source with id of [${incomeSourceId}] does not exist in the database.`,
        helpMessage: `Please try using another ID.`,
      });

    res.status(200).json({
      message: `Income Source with ID [${incomeSourceId}] has been found in the database.`,
      transaction: incomeSource,
    });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
// Deletes single expense source from the database using a provided ID.
export const deleteIncomeSource = async (req, res) => {
  try {
    const incomeSourceId = req.params.id;
    if (!incomeSourceId)
      return res.status(404).json({
        message: `The income source ID has not been supplied.`,
        helpMessage: `Please include the income source ID.`,
      });

    const incomeSource = await incomeSourceModel.findOne({
      _id: incomeSourceId,
    });
    if (!incomeSource)
      return res.status(404).json({
        message: `Income source with id of [${incomeSourceId}] does not exist in the database.`,
        helpMessage: `Please try using another ID.`,
      });

    const removedIncomeSource = await incomeSourceModel.deleteOne({
      _id: incomeSourceId,
    });
    res.status(200).json({
      message: `Income source with ID [${incomeSourceId}] has been removed from the database.`,
      removedIncomeSourceInfo: {
        removedIncomeSource: removedIncomeSource,
        deletedIncomeSource: incomeSource,
      },
    });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
// Updates single expense source item using a provided ID. Can update multiple or single part of object.
export const updateIncomeSource = async (req, res) => {
  try {
    const incomeSourceUpdates = req.body;
    const incomeSourceId = req.params.id;
    if (!incomeSourceId)
      return res.status(404).json({
        message: `The income source ID has not been supplied.`,
        helpMessage: `Please include the income source ID.`,
      });

    const incomeSource = await incomeSourceModel.findOne({
      _id: incomeSourceId,
    });
    if (!incomeSource)
      return res.status(404).json({
        message: `Income source with id of [${incomeSourceId}] does not exist in the database.`,
        helpMessage: `Please try using another ID.`,
      });

    if (incomeSourceUpdates.name) {
      incomeSource.name = incomeSourceUpdates.name;
    }

    incomeSource
      .save()
      .then((data) => {
        // console.log(`incomeSource [${data._id}] added to the database.`);
        res.status(200).json({
          message: `Income source [${data._id}] has been update and saved to the database.`,
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
