const Order = require("../models/Order");

exports.changeOrderStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;
    let orderUpdate = await Order.findByIdAndUpdate(
      orderId,
      { order_status: orderStatus },
      { new: true }
    );

    return res.send(orderUpdate);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Change Order Status Error");
  }
};
exports.getOrders = async (req, res) => {
  try {
    let order = await Order.find()
      .populate("products.product")
      .populate("orderBy", "username")
      .exec();

    return res.json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Get Orders Error");
  }
};
