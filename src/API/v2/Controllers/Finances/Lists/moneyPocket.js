import { moneyPocketModel } from "../../../../../Config/Database Configs/Financial Website/Schema/Lists Schema/moneyPocketSchema.js";
import moment from "moment";

// Returns all money pockets in the database in an array of money pocket objects.
export const getMoneyPockets = async (req, res) => {
  try {
    const list = await moneyPocketModel.find({});

    let listInfo = { listCount: list.length };

    res.status(200).json({
      message: `Below is a list of all money pockets found within the database.`,
      listInfo,
      list,
    });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
// Accepts a JSON object and creates new money pocket object in database with it.
export const createMoneyPocket = async (req, res) => {
  try {
    const moneyPocketToCreate = req.body;
    // console.log({message:`API Call req.body`,transactionToCreate})
    const newMoneyPocket = new moneyPocketModel({
      ...moneyPocketToCreate,
    });

    newMoneyPocket
      .save()
      .then((data) => {
        // console.log(`Transaction [${data._id}] added to the database.`);
        res.status(201).json({
          message: `Money pocket [${data._id}] added to the database.`,
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
// Returns single money pocket from the database using a provided ID.
export const getMoneyPocket = async (req, res) => {
  try {
    const moneyPocketId = req.params.id;
    if (!moneyPocketId)
      return res.status(404).json({
        message: `The money pocket ID has not been supplied.`,
        helpMessage: `Please include the money pocket ID.`,
      });

    const moneyPocket = await moneyPocketModel.findOne({ _id: moneyPocketId });
    if (!moneyPocket)
      return res.status(404).json({
        message: `Money Pocket with id of [${moneyPocketId}] does not exist in the database.`,
        helpMessage: `Please try using another ID.`,
      });

    res.status(200).json({
      message: `Money Pocket with ID [${moneyPocketId}] has been found in the database.`,
      transaction: moneyPocket,
    });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
// Deletes single money pocket from the database using a provided ID.
export const deleteMoneyPocket = async (req, res) => {
  try {
    const moneyPocketId = req.params.id;
    if (!moneyPocketId)
      return res.status(404).json({
        message: `The money pocket ID has not been supplied.`,
        helpMessage: `Please include the money pocket ID.`,
      });

    const moneyPocket = await moneyPocketModel.findOne({ _id: moneyPocketId });
    if (!moneyPocket)
      return res.status(404).json({
        message: `Money pocket with id of [${moneyPocketId}] does not exist in the database.`,
        helpMessage: `Please try using another ID.`,
      });

    const removedMoneyPocket = await moneyPocketModel.deleteOne({
      _id: moneyPocketId,
    });
    res.status(200).json({
      message: `Money pocket with ID [${moneyPocketId}] has been removed from the database.`,
      removedMoneyPocketInfo: {
        removedMoneyPocket: removedMoneyPocket,
        deletedMoneyPocket: moneyPocket,
      },
    });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
// Updates single money pocket item using a provided ID. Can update multiple or single part of object.
export const updateMoneyPocket = async (req, res) => {
  try {
    const moneyPocketUpdates = req.body;
    const moneyPocketId = req.params.id;
    if (!moneyPocketId)
      return res.status(404).json({
        message: `The money pocket ID has not been supplied.`,
        helpMessage: `Please include the money pocket ID.`,
      });

    const moneyPocket = await moneyPocketModel.findOne({
      _id: moneyPocketId,
    });
    if (!moneyPocket)
      return res.status(404).json({
        message: `Money pocket with id of [${moneyPocketId}] does not exist in the database.`,
        helpMessage: `Please try using another ID.`,
      });

    if (moneyPocketUpdates.name) {
      moneyPocket.name = moneyPocketUpdates.name;
    }

    moneyPocket
      .save()
      .then((data) => {
        // console.log(`moneyPocket [${data._id}] added to the database.`);
        res.status(200).json({
          message: `Money pocket [${data._id}] has been update and saved to the database.`,
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
