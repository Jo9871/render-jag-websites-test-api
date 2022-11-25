import express from "express";

import {
  getEstimatedPay,
  getKeyValues,
} from "../../../Controllers/Work/Tesco/keyValues.js";

const router = express.Router();

router.get("/estimatedpay", getEstimatedPay);
router.get("/", getKeyValues);

export default router;
