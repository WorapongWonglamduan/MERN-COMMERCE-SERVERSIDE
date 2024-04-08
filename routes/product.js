const express = require("express");
const router = express.Router();

const { auth, isAdmin } = require("../middleware/auth");
const {
  create,
  list,
  remove,
  edit,
  update,
} = require("../controllers/product");
//Route
//Product
router.post("/product", auth, isAdmin, create);
router.get("/product/:count", list);
router.delete("/product/:id", auth, isAdmin, remove);

//edit
router.get("/products/:id", edit);
router.put("/product/:id", auth, isAdmin, update);

module.exports = router;
