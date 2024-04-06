const express = require("express");
const router = express.Router();

const {
  register,
  listUser,
  editUser,
  deleteUser,
  login,
  currentUser,
} = require("../controllers/auth");

//middleware
const { auth, isAdmin } = require("../middleware/auth");
const {
  listUsers,
  editUsers,
  updateUsers,
  deleteUsers,
  changeStatus,
} = require("../controllers/users");

//Route
//Auth
router.post("/register", register);
router.get("/auth", listUser);
router.post("/login", login);
router.put("/auth", editUser);
router.delete("/auth", deleteUser);
router.post("/current-user", auth, currentUser);
router.post("/current-admin", auth, isAdmin, currentUser);
//User
router.get("/users", auth, isAdmin, listUsers);
router.get("/users/:id", editUsers);
router.put("/users/:id", updateUsers);
router.delete("/users/:id", deleteUsers);

router.post("/change-status", auth, isAdmin, changeStatus);

module.exports = router;
