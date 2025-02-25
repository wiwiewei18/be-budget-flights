const express = require("express");

const AuthController = require("../../../auth/v1/controllers/auth.controller");
const authController = new AuthController();

const AirportController = require("../controllers/airport.controller");
const airportController = new AirportController();

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrict("admin"),
    airportController.createAirport
  )
  .get(authController.protect, airportController.getAirportList);

router
  .route("/:id")
  .get(authController.protect, airportController.getAirport)
  .patch(
    authController.protect,
    authController.restrict("admin"),
    airportController.patchAirport
  )
  .delete(
    authController.protect,
    authController.restrict("admin"),
    airportController.deleteAirport
  );

module.exports = router;
