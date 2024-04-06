const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.listUsers = async (req, res) => {
  try {
    const user = await User.find({}).select("-password").exec();

    const obj = { data: user, message: "hello" };
    return res.send(obj);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
exports.editUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id }).select("-password").exec();
    return res.send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
exports.updateUsers = async (req, res) => {
  try {
    return res.send("hello update users");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
exports.deleteUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOneAndDelete({ _id: id });
    return res.send("hello delete users");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
