import express from 'express';

const router = express.Router();

import registerRoutes from "./Register.js";
import loginRoutes from "./Login.js";
import logoutRoutes from "./Logout.js";
import refreshRoutes from "./Refresh.js";

router.use("/register", registerRoutes);
router.use("/login", loginRoutes);
router.use("/logout", logoutRoutes);
router.use("/refresh", refreshRoutes);

router.get("/", (req, res) => {
  res
    .status(200)
    .json({
      message: `You have reached the auth endpoint.`,
      help: `This endpoint has not data please try another one from the documentation.`,
      urls: {
        mainWebsite: `https://www.jagwebsites.xyz`,
        apiDocs: `https://api.docs.jagwebsites.xyz`,
      },
    });
})

export default router;