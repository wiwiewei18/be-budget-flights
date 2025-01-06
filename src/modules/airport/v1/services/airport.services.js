const Airport = require("../models/airport.model");
const HttpStatusCode = require("../../../../common/constants/HttpStatusCode");
const CustomError = require("../../../../common/utils/CustomError");
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

  getAirport = async (req) => {
    return this.airportModel.findById(req.params.id);
  };

  #validatePatchAirportRequest = (req) => {
    const patchAbleFields = ["name", "country", "city"];

    const toPatchfields = Object.keys(req.body);

    for (const field of toPatchfields) {
      if (!patchAbleFields.includes(field)) {
        throw new CustomError(
          HttpStatusCode.BAD_REQUEST,
          `${field} is not allowed to be updated`
        );
      }
    }

    return;
  };

  patchAirport = async (req) => {
    this.#validatePatchAirportRequest(req);

    return this.airportModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  };
}

module.exports = AirportService;
