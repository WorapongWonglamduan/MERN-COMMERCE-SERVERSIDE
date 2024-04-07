const express = require("express");
const router = express.Router();

const { createImage, removeImage } = require("../controllers/cloudinary");
const { auth, isAdmin } = require("../middleware/auth");
//Route

router.post("/images", auth, isAdmin, createImage);
router.post("/remove-images", auth, isAdmin, removeImage);

module.exports = router;
