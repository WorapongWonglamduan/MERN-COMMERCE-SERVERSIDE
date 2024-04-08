const Product = require("../models/Products");

exports.list = async (req, res) => {
  try {
    const count = parseInt(req.params.count);
    const product = await Product.find({})
      .populate("category")
      .limit(count)
      .sort([["createdAt", "desc"]]);
    return res.send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

exports.create = async (req, res) => {
  try {
    const product = await new Product(req.body).save();
    return res.send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Create Product Error !!");
  }
};
exports.edit = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id })
      .populate("category")
      .exec();
    return res.send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    }).exec();
    return res.send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete({ _id: id }).exec();
    return res.send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

exports.listBy = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;

    const product = await Product.find({})
      .populate("category")
      .limit(limit)
      .sort([[sort, order]]);
    return res.send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send("List By Product Error !!");
  }
};
