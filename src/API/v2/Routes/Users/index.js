import express from "express";

const router = express.Router();

import userRoute from "./Users.js";
router.use("/users", userRoute);

import userTokenRoute from "./UserRefreshToken.js";
router.use("/userbyrefreshtoken", userTokenRoute);

router.get("/", (req, res) => {
  res.status(200).json({
    message: `You have reached the users endpoint.`,
    help: `This endpoint has not data please try another one from the documentation.`,
    urls: {
      mainWebsite: `https://www.jagwebsites.xyz`,
      apiDocs: `https://api.docs.jagwebsites.xyz`,
    },
  });
});

export default router;
