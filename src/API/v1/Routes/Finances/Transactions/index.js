import express from "express";

const router = express.Router();

import incomeRoutes from "./Income.js";
import expensesRoutes from "./Expenses.js";
import transfersRoutes from "./Transfers.js";
import totalRoutes from "./Totals.js";
import filteredRoutes from "./Filtered.js";

router.use("/income", incomeRoutes);
router.use("/expenses", expensesRoutes);
router.use("/transfers", transfersRoutes);
router.use("/totals", totalRoutes);
router.use("/filtered", filteredRoutes);

router.get("/", (req, res) => {
  res.status(200).json({
    message: `You have reached the transactions endpoint.`,
    help: `This endpoint has not data please try another one from the documentation.`,
    urls: {
      mainWebsite: `https://www.jagwebsites.xyz`,
      apiDocs: `https://api.docs.jagwebsites.xyz`,
    },
  });
});

export default router;
