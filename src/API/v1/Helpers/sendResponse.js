import moment from "moment";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";

export const success = (req, res, status, json) => {
  res.status(status).json({
    success: true,
    apiInfo: {
      version: "v1",
      docs: `https://api.docs.jagwebsites.xyz`,
    },
    requestInfo: {
      method: req.method,
      hostName: req.hostname,
      baseUrl: req.baseUrl,
    },
    responseInfo: {
      status: {
        code: status,
        context: getReasonPhrase(status),
        both: `${status} ${getReasonPhrase(status).toUpperCase()}`,
      },
      dateAndTime: {
        together: moment(new Date()).format("DD/MM/YY HH:mm:ss"),
        date: moment(new Date()).format("DD/MM/YY"),
        time: moment(new Date()).format("HH:mm:ss"),
      },
    },
    responseData: {
      ...json,
    },
  });
};

export const error = (req, res, status, error, json) => {
  const obj = {
    success: false,
    apiInfo: {
      version: "v1",
      docs: `https://api.docs.jagwebsites.xyz`,
    },
    requestInfo: {
      method: req.method,
      hostName: req.hostname,
      baseUrl: req.baseUrl,
    },
    responseInfo: {
      status: {
        code: status,
        context: getReasonPhrase(status),
        both: `${status} ${getReasonPhrase(status).toUpperCase()}`,
      },
      dateAndTime: {
        together: moment(new Date()).format("DD/MM/YY HH:mm:ss"),
        date: moment(new Date()).format("DD/MM/YY"),
        time: moment(new Date()).format("HH:mm:ss"),
      },
    },
    error: {
      ...error,
    },
  };
  res.status(status).json(obj);
};
