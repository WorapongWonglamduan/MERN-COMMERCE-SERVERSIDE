const express = require("express");
const router = express.Router();

const { register, login, currentUser } = require("../controllers/auth");

//middleware
const { auth, isAdmin } = require("../middleware/auth");

//Route
//Auth
router.post("/register", register);
router.post("/login", login);
router.post("/current-user", auth, currentUser);
router.post("/current-admin", auth, isAdmin, currentUser);

module.exports = router;
