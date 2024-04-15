const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Product = require("../models/Products");
const Cart = require("../models/Cart");
const jwt = require("jsonwebtoken");

exports.list = async (req, res) => {
  try {
    const user = await User.find({}).select("-password").exec();

    // const obj = { data: user, message: "hello" };
    return res.send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id }).select("-password").exec();
    return res.send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
exports.update = async (req, res) => {
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
exports.remove = async (req, res) => {
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
exports.userCart = async (req, res) => {
  try {
    const { cart } = req.body;
    let user = await User.findOne({ username: req.user.username })
      .select("_id username role")
      .exec();
    let products = [];
    let cartOld = await Cart.findOne({ orderBy: user._id }).exec();
    if (cartOld) {
      await Cart.deleteOne({ _id: cartOld._id });
    }
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.price = cart[i].price;

      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal += products[i].price * products[i].count;
    }
    let newCart = await new Cart({
      products,
      cartTotal,
      orderBy: user,
    }).save();

    return res.send(newCart);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
exports.getUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    let cart = await Cart.findOne({ orderBy: user._id })
      .populate("products.product", "_id title price")
      .exec();

    const { products, cartTotal } = cart;
    return res.json({ products, cartTotal });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
exports.saveAddress = async (req, res) => {
  try {
    return res.send('dd');
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
