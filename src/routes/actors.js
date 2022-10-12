const express = require("express");
const router = express.Router();
const {actorsController} = require("../controller")
const fileUploader = require("../lib/uploader");


router.get("/", actorsController.getActors);
// router.post("/", actorsController.addActor);

// router.post("/new-caster",middleware, function controller)

router.post(
    "/",
    fileUploader({
      destinationFolder: "post_images",
      fileType: "image",
      prefix: "POST",
    }).single("image"),
    actorsController.addActor
  );
module.exports = router;
