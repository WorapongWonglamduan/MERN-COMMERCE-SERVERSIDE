const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const token = req.headers["authtoken"];

    console.log("token =>", token);
    if (!token) {
      return res.status(401).send("No token, authorization denied");
    }
    const decode = jwt.verify(token, "jwtSecret");

    console.log("decode =>", decode);

    req.user = decode.user;

    // req.user = decode.user
    next();
  } catch (error) {
    console.error("error=>", error);

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send("Token has expired");
    }
    return res.status(401).send("Token Invalid");
  }
};
