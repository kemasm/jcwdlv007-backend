const express = require("express");
const router = express.Router();
const {userController} = require("../controller")


router.get("/", userController.getLogin);

module.exports = router;