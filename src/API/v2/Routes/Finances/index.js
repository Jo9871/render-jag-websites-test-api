import express from "express";

const router = express.Router();

import transactionRoutes from "./Transactions/index.js"
import listRoutes from "./Lists/index.js"

router.use("/transactions", transactionRoutes)
router.use("/lists", listRoutes)

router.get("/", (req, res) => {
  res
    .status(200)
    .json({
      message: `You have reached the finances endpoint.`,
      help: `This endpoint has not data please try another one from the documentation.`,
      urls: {
        mainWebsite: `https://www.jagwebsites.xyz`,
        apiDocs: `https://api.docs.jagwebsites.xyz`,
      },
    });
});

export default router;
