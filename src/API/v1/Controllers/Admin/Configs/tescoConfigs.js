import moment from "moment";

import {
  success as successFunc,
  error as errorFunc,
} from "../../../Helpers/sendResponse.js";
import { formatCurrency } from "../../../Helpers/formatter.js";
import { getTimeBetween } from "../../../Helpers/utils.js";
import { tescoConfigsModel } from "../../../../../Config/Database Configs/Admin/Schema/configSchemas.js";

// Returns all Expense Transaction in the database in an array of transaction objects.
export const getContractedHours = async (req, res) => {
  try {
    const tescoConfig = await tescoConfigsModel.find({
      _id: `6282df5c189c71c0da7c8bc4`,
    });

    // successFunc(req, res, 200, {
    //   keyValues },
    // });

    res.status(200).json({
      contractedHours: tescoConfig[0].contractedHours,
      currentBaseRate: tescoConfig[0].currentBaseRate,
      baseRateMultiplier: tescoConfig[0].baseRateMultiplier,
    });
  } catch (error) {
    // errorFunc(res, res, 200, error);
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
