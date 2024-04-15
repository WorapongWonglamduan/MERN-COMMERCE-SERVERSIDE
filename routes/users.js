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
router.post("/user/address", auth, saveAddress);

module.exports = router;
