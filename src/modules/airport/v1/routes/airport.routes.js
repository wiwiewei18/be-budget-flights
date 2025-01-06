const express = require("express");

const AuthController = require("../../../auth/v1/controllers/auth.controller");
const authController = new AuthController();

const AirportController = require("../controllers/airport.controller");
const airportController = new AirportController();

const router = express.Router();

router.route("/").post(authController.protect, airportController.createAirport);

module.exports = router;
