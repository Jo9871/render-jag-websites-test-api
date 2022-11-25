import express from "express";

const router = express.Router();

//Middlewars

//Routes
import allRoutes from "./Routes/index.js";
router.use("/", allRoutes);

router.get("/", (req, res) => {
  res.status(200).json({
    message: `You have reached the V1 endpoint.`,
    help: `This endpoint has not data please try another one from the documentation.`,
    urls: {
      mainWebsite: `https://www.jagwebsites.xyz`,
      apiDocs: `https://api.docs.jagwebsites.xyz`,
    },
  });
});

export default router;
