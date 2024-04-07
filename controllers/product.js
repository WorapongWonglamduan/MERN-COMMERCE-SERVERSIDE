const Product = require("../models/Products");

exports.list = async (req, res) => {
  try {
    const product = await Product.find({}).populate("category").exec();
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
    return res.status(500).send("Server Error");
  }
};
// exports.edit = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findOne({ _id: id });
//     return res.send(product);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Server Error");
//   }
// };
// exports.update = async (req, res) => {
//   try {
//     const { name } = req.body;
//     const { id } = req.params;
//     const product = await Product.findOneAndUpdate({ _id: id }, { name: name });
//     return res.send(product);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Server Error");
//   }
// };
// exports.remove = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const product = await Product.findOneAndDelete({ _id: id });
//     return res.send(product);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Server Error");
//   }
// };
