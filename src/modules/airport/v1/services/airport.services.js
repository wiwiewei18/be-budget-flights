const Airport = require("../models/airport.model");

class AirportService {
  constructor() {
    this.airportModel = Airport;
  }

  createAirport = async (req) => {
    return this.airportModel.create(req.body);
  };
}

module.exports = AirportService;
