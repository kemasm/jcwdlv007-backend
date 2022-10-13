const express = require("express");
const router = express.Router();
const {moviesController} = require("../controller")
const fileUploader = require("../lib/uploader");



router.get("/", moviesController.getMovies);
router.get("/v2/", moviesController.getMovies2);

router.get("/actor/:id", moviesController.getActorByMovieId);
router.get("/genre/:id", moviesController.getGenreByMovieId);

//create movie
router.post(
    "/",
    fileUploader({
      destinationFolder: "movie_images",
      fileType: "image",
      prefix: "POST",
    }).single("image"),
    moviesController.addMovie
  );
//update movie
  router.patch(
    "/",
    fileUploader({
      destinationFolder: "movie_images",
      fileType: "image",
      prefix: "POST",
    }).single("image"),
    moviesController.editMovie
  );
//delete movie
  router.delete("/", moviesController.deleteMovie);

module.exports = router;
