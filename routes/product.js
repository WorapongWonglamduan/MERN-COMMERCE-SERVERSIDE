const express = require("express");
const router = express.Router();

const { auth, isAdmin } = require("../middleware/auth");
const { create, list } = require("../controllers/product");
//Route
//Product
router.post("/product", auth, isAdmin, create);
router.get("/product", list);

module.exports = router;
