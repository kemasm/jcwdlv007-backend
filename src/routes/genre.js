const express = require("express");
const router = express.Router();
const { genresController } = require("../controller")


router.get("/", genresController.getGenres);

module.exports = router;
