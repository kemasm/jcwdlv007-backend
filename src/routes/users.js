const express = require("express");
const router = express.Router();
const {userController} = require("../controller")


router.get("/", userController.getLogin);
router.post("/register", userController.register);


module.exports = router;