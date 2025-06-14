const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    loginStatus,
    logoutUser,
    adminlogin,
    // testing,
} = require("../routing/userCtr");

router.post("/api/register",registerUser);
router.post("/api/login",loginUser);
router.get("/api/loggedin",loginStatus);
router.get("/api/logout",logoutUser);
router.post("/api/adminlogin",adminlogin);
// router.get("/api/tesing",testing);

module.exports = router;