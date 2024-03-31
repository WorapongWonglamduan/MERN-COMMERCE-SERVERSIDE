const express = require("express");
const router = express.Router();

const {
  register,
  listUser,
  editUser,
  deleteUser,
} = require("../controllers/auth");

//Route
router.get("/auth", listUser);
router.post("/auth", register);
router.put("/auth", editUser);
router.delete("/auth", deleteUser);

module.exports = router;
