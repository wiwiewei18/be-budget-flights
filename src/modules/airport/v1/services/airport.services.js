const Airport = require("../models/airport.model");
const Pagination = require("../../../../common/utils/Pagination");

class AirportService {
  constructor() {
    this.airportModel = Airport;
  }

  createAirport = async (req) => {
    return this.airportModel.create(req.body);
  };

  getAirportList = async (req) => {
    const { query } = req;

    const [paginatedAirportList, count] = new Pagination(
      this.airportModel,
      query
    )
      .paginate()
      .sort()
      .select()
      .filter()
      .search(["iataCode", "name", "country", "city"])
      .run();

    return await Promise.all([paginatedAirportList, count]);
  };
}

module.exports = AirportService;
