const express = require("express");
const router = express.Router();

const {
  list,
  edit,
  update,
  remove,
  create,
} = require("../controllers/category");
const { auth, isAdmin } = require("../middleware/auth");
//Route
//Category
router.get("/category", auth, isAdmin, list);
router.post("/category", auth, isAdmin, create);
router.get("/category/:id", auth, isAdmin, edit);
router.put("/category/:id", auth, isAdmin, update);
router.delete("/category/:id", auth, isAdmin, remove);

module.exports = router;
