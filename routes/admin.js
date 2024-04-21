const express = require("express");
const router = express.Router();
//middleware
const { auth, isAdmin } = require("../middleware/auth");
const { changeOrderStatus, getOrders } = require("../controllers/admin");

//Route

//Admin
router.put("/admin/order-status", auth, isAdmin, changeOrderStatus);
router.get("/admin/orders", auth, isAdmin, getOrders);

module.exports = router;
