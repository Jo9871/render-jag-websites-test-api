import express from "express";

const router = express.Router();

import tescoRoutes from "./Tesco/index.js";
router.use("/tesco", tescoRoutes);

router.get("/", (req, res) => {
  res.status(200).json({
    message: `You have reached the work endpoint.`,
    help: `This endpoint has not data please try another one from the documentation.`,
    urls: {
      mainWebsite: `https://www.jagwebsites.xyz`,
      apiDocs: `https://api.docs.jagwebsites.xyz`,
    },
  });
});

export default router;
