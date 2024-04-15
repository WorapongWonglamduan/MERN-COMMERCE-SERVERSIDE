const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.auth = (req, res, next) => {
  try {
    const token = req.headers["authtoken"];

    if (!token) {
      return res.status(401).send("No token, authorization denied");
    }
    const decode = jwt.verify(token, "jwtSecret");

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

exports.isAdmin = async (req, res, next) => {
  try {
    const { username } = req.user;
    const adminUser = await User.findOne({ username }).exec();
    if (adminUser.role !== "admin") {
      return res.status(403).send(err, "Admin Access denied");
    } else {
      next();
    }
  } catch (error) {
    console.error("error=>", error);

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send("Token has expired");
    }
    return res.status(401).send("Token Invalid");
  }
};
