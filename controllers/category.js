const Category = require("../models/Category");

exports.list = async (req, res) => {
  try {
    const category = await Category.find({}).exec();
    return res.json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Category Server Error");
  }
};

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name: name }).save();
    return res.send(category);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
exports.edit = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ _id: id });
    return res.send(category);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findOneAndUpdate(
      { _id: id },
      { name: name }
    );
    return res.send(category);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findOneAndDelete({ _id: id });
    return res.send(category);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
