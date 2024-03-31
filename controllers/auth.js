const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    //check user
    const { username, password } = req.body;

    res.send(username);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.listUser = async (req, res) => {
  try {
    res.send("List Get User");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
exports.editUser = async (req, res) => {
  try {
    res.send("Edit User");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
exports.deleteUser = async (req, res) => {
  try {
    res.send("Delete User");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
