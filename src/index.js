import { getTimeBetween } from "./API/v1/Helpers/utils.js";
import {} from "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5001;

import { getKeyValues } from "./Services/getKeyValues.js";
getKeyValues();

//Logging
import { logger } from "./Middlewares/logEvents.js";
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
// import { credentials } from "./Middlewares/credentials.js";
// app.use(credentials);

// Cross Origin Resource Sharing
// import corsOptions from "./Config/CORS/corsOptions.js";
// app.use(cors(corsOptions));
app.use(cors());

// Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));
// Built-in middleware for JSON
app.use(express.json());

//Middleware for cookies
import cookieParser from "cookie-parser";
app.use(cookieParser());

import v1Routes from "./API/v1/index.js";
app.use("/v1", v1Routes);
import v2Routes from "./API/v2/index.js";
app.use("/v2", v2Routes);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: `You have reached the JAG Websites API.`,
    help: `This endpoint has not data please try another one from the documentation.`,
    links: {
      mainWebsite: `https://www.jagwebsites.xyz`,
      accountsWebsite: `https://accounts.jagwebsites.xyz`,
      myAccountWebsite: `https://myaccount.jagwebsites.xyz`,
      financeWebsite: `https://finance.jagwebsites.xyz`,
      adminWebsite: `https://admin.jagwebsites.xyz`,
      linksWebsite: `https://links.jagwebsites.xyz`,
      docWebsites: {
        mainDocs: `https://docs.jagwebsites.xyz`,
        apiDocs: `https://api.docs.jagwebsites.xyz`,
      },
    },
  });
});
app.all("*", (req, res) => {
  res.status(404).json({
    message: "You've tried reaching a route that doesn't exist.",
    help: `This endpoint has no data and does not exist, please refer to the documentation.`,
    links: {
      mainWebsite: `https://www.jagwebsites.xyz`,
      accountsWebsite: `https://accounts.jagwebsites.xyz`,
      myAccountWebsite: `https://myaccount.jagwebsites.xyz`,
      financeWebsite: `https://finance.jagwebsites.xyz`,
      adminWebsite: `https://admin.jagwebsites.xyz`,
      linksWebsite: `https://links.jagwebsites.xyz`,
      docWebsites: {
        mainDocs: `https://docs.jagwebsites.xyz`,
        apiDocs: `https://api.docs.jagwebsites.xyz`,
      },
    },
  });
});

app.listen(PORT, () => {
  console.log(`API Server is now running on port ${PORT}`);
});
