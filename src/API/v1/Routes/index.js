import express from "express";

const router = express.Router();

import financesRoutes from "./Finances/index.js";
router.use("/finances", financesRoutes);
import workRoutes from "./Work/index.js";
router.use("/work", workRoutes);
import adminRoutes from "./Admin/index.js";
router.use("/admin", adminRoutes);

export default router;
