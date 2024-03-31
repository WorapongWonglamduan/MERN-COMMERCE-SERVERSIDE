const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    //check user
    const { username, password } = req.body;

    var user = await User.findOne({ username });
    if (user) {
      return res.status(400).send("User Already exits");
    }
    const salt = await bcrypt.genSalt(10);
    user = new User({
      username,
      password,
    });

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    return res.send("Register Success");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
exports.login = async (req, res) => {
  try {
    //check user
    const { username, password } = req.body;

    var user = await User.findOneAndUpdate({ username }, { new: true });

    if (user && user.enabled) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send("Password invalid");
      }

      //payload
      const payload = {
        user: { username: user.username, role: user.role },
      };

      //generate token
      jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (error, token) => {
        if (error) throw error;
        return res.json({ token, payload });
      });
    } else {
      return res.status(400).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.listUser = async (req, res) => {
  try {
    return res.send("List Get User");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
exports.editUser = async (req, res) => {
  try {
    return res.send("Edit User");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
exports.deleteUser = async (req, res) => {
  try {
    return res.send("Delete User");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
