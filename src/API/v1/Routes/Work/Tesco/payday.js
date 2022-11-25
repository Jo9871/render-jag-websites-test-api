import express from "express";

import { getPayDayInfo } from "../../../Controllers/Work/Tesco/payDayInfo.js";

const router = express.Router();

router.get("/", getPayDayInfo);

export default router;
