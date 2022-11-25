import express from "express";

const router = express.Router();

import payDay from "./payday.js";
router.use("/payday", payDay);

import shifts from "./shifts.js";
router.use("/shifts", shifts);

import keyValues from "./keyValues.js";
router.use("/keyvalues", keyValues);

router.get("/", (req, res) => {
  res.status(200).json({
    message: `You have reached the tesco work endpoint.`,
    help: `This endpoint has not data please try another one from the documentation.`,
    urls: {
      mainWebsite: `https://www.jagwebsites.xyz`,
      apiDocs: `https://api.docs.jagwebsites.xyz`,
    },
  });
});

export default router;
