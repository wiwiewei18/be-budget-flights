const Airport = require("../models/airport.model");

class AirportService {
  constructor() {
    this.airportModel = Airport;
  }

  getAirportById = async (id) => {
    return this.airportModel.findById(id);
  };
}

module.exports = AirportService;
