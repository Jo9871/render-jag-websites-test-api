import express from "express";

const router = express.Router();

//Middlewars

//Routes

import authRoutes from "./Routes/Auth/index.js";
router.use("/auth", authRoutes);

import { verifyJWT } from "../../Middlewares/verifyJWT.js";
router.use(verifyJWT);

import usersRoutes from "./Routes/Users/index.js";
router.use("/users", usersRoutes);
import financesRoutes from "./Routes/Finances/index.js";
router.use("/finances", financesRoutes);

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
