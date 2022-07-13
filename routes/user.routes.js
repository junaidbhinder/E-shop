const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/user.controller");
router.post("/registerUser", usercontroller.userRegister);
router.get("/findAllUser", usercontroller.allUser);
router.get("/getUser/:id", usercontroller.getUserById);
router.post("/loginUser", usercontroller.loginUser);
router.get("/currentUserLoign", usercontroller.currentuserlogin);
module.exports = router;
