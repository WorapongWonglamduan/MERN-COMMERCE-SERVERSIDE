const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Product = require("../models/Products");
const Cart = require("../models/Cart");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");

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
    const userAddress = await User.findOneAndUpdate(
      {
        username: req.user.username,
      },
      { address: req.body.address }
    ).exec();
    return res.json({ message: "update success" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
exports.saveOrder = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.user.username }).exec();
    let userCart = await Cart.findOne({ orderBy: user._id }).exec();

    let order = await new Order({
      products: userCart.products,
      orderBy: user._id,
      cartTotal: userCart.cartTotal,
    }).save();

    let bulkOption = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: item.count } },
        },
      };
    });
    let updated = await Product.bulkWrite(bulkOption, {});

    return res.send(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
exports.emptyCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();
    const empty = await Cart.findOneAndDelete({ orderBy: user._id }).exec();
    return res.send(empty);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Remove Cart Error");
  }
};
exports.addToWishList = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findOneAndUpdate(
      {
        username: req.user.username,
      },
      { $addToSet: { wishlist: productId } }
    ).exec();

    return res.send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Add Wishlist Error");
  }
};
exports.getWishList = async (req, res) => {
  try {
    let list = await User.findOne({
      username: req.user.username,
    })
      .select("wishlist")
      .populate("wishlist")
      .exec();

    return res.json(list);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Get Wishlist Error");
  }
};
exports.removeWishList = async (req, res) => {
  try {
    const { productId } = req.params;

    console.log("req.params--->", req.params);
    let user = await User.findOneAndUpdate(
      { username: req.user.username },
      {
        $pull: { wishlist: productId },
      }
    ).exec();

    return res.send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Remove Wishlist Error");
  }
};
