const { validationResult } = require("express-validator");
const { v4 } = require("uuid");
const HttpError = require("../models/http-error");

let PLACES = [
  {
    id: "p1",
    title: "Makli Necropolis",
    description:
      "Makli Necropolis is one of the largest funerary sites in the world, spread over an area of 10 kilometres near the city of Thatta, in the Pakistani province of Sindh. The site houses approximately 500,000 to 1 million tombs built over the course of a 400-year period.",
    address: "Makli, Thatta, Sindh",
    creator: "u1",
  },
  {
    id: "p2",
    title: "KARLI",
    description:
      "Keenjhar Lake commonly called Malik Lake is located in Thatta District of Sindh the province of Pakistan. It is situated about 36 kilometres from the city of Thatta. It is the largest fresh water lake in Pakistan and an important source of drinking water for Thatta District and Karachi city.",
    address: "Thatta, Sindh",
    creator: "u2",
  },
];

const getPlaceById = (req, res, next) => {
  const placeID = req.params.placeID;
  const place = PLACES.find((p) => {
    return p.id === placeID;
  });

  if (!place) {
    throw new HttpError("No place found with this place id", 404);
  }
  res.json({
    place,
  });
};

const getPlacesByUserId = (req, res, next) => {
  const userID = req.params.userID;
  const places = PLACES.filter((p) => {
    return p.creator === userID;
  });
  if (!places || places.length === 0) {
    return next(new HttpError("No place found for this user id", 404));
  }
  res.json({
    places,
  });
};

const createPlace = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    throw new HttpError("Invalid input", 422);
  }

  const { title, description, address, creator } = req.body;

  const createdPlace = {
    id: v4(),
    title,
    description,
    address,
    creator,
  };

  PLACES.push(createdPlace);
  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    throw new HttpError("Invalid input", 422);
  }
  const { title, description } = req.body;
  const placeId = req.params.placeID;

  const updatedPlace = { ...PLACES.find((p) => p.id === placeId) };
  const placeIndex = PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.placeID;
  const place = PLACES.find((p) => p.id === placeId);
  if (!place) {
    throw new HttpError("Placce not found with this error", 404);
  }
  PLACES = PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Place deleted" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
