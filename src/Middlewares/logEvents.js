import { format } from "date-fns";
import { v4 as uuid } from "uuid";

import fs from "fs";
import { promises as fsPromises } from "fs";
import path from "path";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyy-MM-dd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "Logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "Logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "Logs", logName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  const query = req.query;

  let queries = ``;

  if (Object.keys(query).length !== 0) {
    queries = `?`;
    Object.keys(query).map((key, i) => {
      if (i + 1 == Object.keys(query).length) {
        queries = queries += `${key}=${query[key]}`;
      } else {
        queries = queries += `${key}=${query[key]}&`;
      }
    });
  }

  logEvents(
    `${req.method}\t${req.headers.origin || "Self"}\t${req.url}`,
    "reqLog.log"
  );
  console.log(`${req.method} ${req.path}${queries}`);
  next();
};

export { logger, logEvents };
