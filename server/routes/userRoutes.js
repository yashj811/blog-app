const express = require("express");
const router = express.Router();
const {
  Login,
  SignUp,
  user,
} = require("../controllers/userControllers");
const auth = require("../middlewares/auth");

router.post("/signup", SignUp);
router.post("/login", Login);
// router.get("/user", allUser);
router.get("/user",auth, user);

module.exports = router;
