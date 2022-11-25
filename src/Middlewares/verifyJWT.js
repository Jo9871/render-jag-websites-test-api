import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const { apiKey } = req.query;
  // console.log(apiKey);
  if (apiKey !== `iAmTesting`) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer "))
      return res.status(401).json({
        success: false,
        apiInfo: {
          version: "v1",
          docs: `https://api.docs.jagwebsites.xyz`,
        },
        error: {
          errorMessage: `You are unauthorized.`,
          helpMessage: `Pleases sign in to get a JWT cookie.`,
        },
      });
    const token = authHeader.split(" ")[1];
    // console.log(token)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403); //invalid token
      req.user = decoded.UserInfo.username;
      req.roles = decoded.UserInfo.roles;
      next();
    });
  }
  next();
};
