const express = require("express");
const router = express.Router();
const {actorsController} = require("../controller")


router.get("/", actorsController.getActors);

module.exports = router;
