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
router.get("/category", list);
router.post("/category", create);
router.get("/category/:id", edit);
router.put("/category/:id", update);
router.delete("/category/:id", remove);

module.exports = router;
