export const success = (req, res, status, json) => {
  const obj = {
    success: true,
    apiInfo: {
      version: "v1",
      docs: `https://api.docs.jagwebsites.xyz`,
    },
    ...json,
  };
  res.status(status).json(obj);
};

export const error = (req, res, status, error, json) => {
  const obj = {
    success: false,
    apiInfo: {
      version: "v1",
      docs: `https://api.docs.jagwebsites.xyz`,
    },
    error: {
      ...error,
    },
  };
  res.status(status).json(obj);
};
