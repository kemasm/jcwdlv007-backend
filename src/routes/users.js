const express = require("express");
const router = express.Router();
const {userController} = require("../controller");
const { authorizedLoggedInUser } = require("../middlewares/authMiddleware");


router.get("/", userController.getLogin);
router.post("/register", userController.register);
router.post("/v2/register", userController.registerV2);
router.get("/v2/login", userController.loginV2);
router.get("/refresh-token", authorizedLoggedInUser, userController.keepLogin);





module.exports = router;