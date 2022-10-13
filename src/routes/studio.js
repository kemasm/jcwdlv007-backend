const express = require("express");
const router = express.Router();
const {studiosController} = require("../controller")


router.get("/", studiosController.getAll);

module.exports = router;
