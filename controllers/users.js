const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.listUsers = async (req, res) => {
  try {
    const user = await User.find({}).select("-password").exec();

    // const obj = { data: user, message: "hello" };
    return res.send(user);
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
    var { id, password } = req.body.values;
    const salt = await bcrypt.genSalt(10);

    var enPassword = await bcrypt.hash(password, salt);
    const user = await User.findOneAndUpdate(
      { _id: id },
      { password: enPassword }
    );

    return res.send(user);
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
exports.changeStatus = async (req, res) => {
  try {
    console.log("req ->", req.body);

    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { enabled: req.body.enabled }
    )
      .select("-password")
      .exec();
    return res.send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
exports.changeRole = async (req, res) => {
  try {
    console.log("req ->", req.body);

    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { role: req.body.role }
    )
      .select("-password")
      .exec();

    return res.send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
