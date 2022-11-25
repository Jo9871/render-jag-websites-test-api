import express from 'express';

const router = express.Router();

import moneyPocketRoutes from "./moneyPocket.js";
import incomeSourceRoutes from "./incomeSource.js";
import incomeCategoryRoutes from "./incomeCategory.js";
import expenseVendorRoutes from "./expenseVendor.js";
import expenseCategoryRoutes from "./expenseCategory.js";

router.use("/moneypockets", moneyPocketRoutes);
router.use("/incomesources", incomeSourceRoutes);
router.use("/incomecategories", incomeCategoryRoutes);
router.use("/expensevendors", expenseVendorRoutes);
router.use("/expensecategories", expenseCategoryRoutes);

router.get("/", (req, res) => {
  res
    .status(200)
    .json({
      message: `You have reached the lists endpoint.`,
      help: `This endpoint has not data please try another one from the documentation.`,
      urls: {
        mainWebsite: `https://www.jagwebsites.xyz`,
        apiDocs: `https://api.docs.jagwebsites.xyz`,
      },
    });
})

export default router;