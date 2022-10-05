const express = require("express");
const router = express.Router();
const {moviesController} = require("../controller")


router.get("/", moviesController.getMovies);
router.get("/v2/", moviesController.getMovies2);

router.get("/actor/:id", moviesController.getActorByMovieId);
router.get("/genre/:id", moviesController.getGenreByMovieId);


module.exports = router;
