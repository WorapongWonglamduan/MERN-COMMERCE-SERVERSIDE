const express = require("express");
const router = express.Router();
//middleware
const { auth, isAdmin } = require("../middleware/auth");
const {
  list,
  edit,
  update,
  remove,
  changeStatus,
  changeRole,
  userCart,
  getUserCart,
  saveAddress,
  saveOrder,
  emptyCart,
  getWishList,
  addToWishList,
  removeWishList,
  getOrders,
} = require("../controllers/users");

//Route

//User
router.get("/users", auth, isAdmin, list);
router.get("/users/:id", edit);
router.put("/users/:id", update);
router.delete("/users/:id", auth, isAdmin, remove);

router.post("/change-status", auth, isAdmin, changeStatus);
router.post("/change-role", auth, isAdmin, changeRole);
router.post("/user/cart", auth, userCart);
router.get("/user/cart", auth, getUserCart);
router.delete("/user/cart", auth, emptyCart);
router.post("/user/address", auth, saveAddress);
router.post("/user/order", auth, saveOrder);
router.get("/user/orders", auth, getOrders);

router.get("/user/wishlist", auth, getWishList);
router.post("/user/wishlist", auth, addToWishList);
router.put("/user/wishlist/:productId", auth, removeWishList);

module.exports = router;
