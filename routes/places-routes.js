const express = require("express");
const bodyParser = require("body-parser");
const {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/places-controller");
const { check } = require("express-validator");

const router = express.Router();

router.get("/:placeID", getPlaceById);

router.get("/user/:userID", getPlacesByUserId);

router.post(
  "/",
  [
    check("title").notEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").notEmpty(),
  ],
  createPlace
);

router.patch("/:placeID", updatePlace);

router.delete("/:placeID", deletePlace);

module.exports = router;
