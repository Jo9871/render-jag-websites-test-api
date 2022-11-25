import express from "express";

const router = express.Router();

import tescoConfigRoutes from "./tescoConfigs.js";
router.use("/tesco", tescoConfigRoutes);

router.get("/", (req, res) => {
  res.status(200).json({
    message: `You have reached the configs endpoint.`,
    help: `This endpoint has not data please try another one from the documentation.`,
    urls: {
      mainWebsite: `https://www.jagwebsites.xyz`,
      apiDocs: `https://api.docs.jagwebsites.xyz`,
    },
  });
});

export default router;
