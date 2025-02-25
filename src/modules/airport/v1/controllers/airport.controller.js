const AirportServices = require("../services/airport.services");

const BaseController = require("../../../../common/controllers/base.controller");
const AsyncErrorHandler = require("../../../../common/utils/AsyncErrorHandler");

class AirportController extends BaseController {
  constructor() {
    super();

    this.airportServices = new AirportServices();
  }

  createAirport = AsyncErrorHandler(async (req, res, next) => {
    const airport = await this.airportServices.createAirport(req);

    this.ok(res, "Airport created successfully", { airport });
  });

  getAirportList = AsyncErrorHandler(async (req, res) => {
    const [airportList, count] = await this.airportServices.getAirportList(req);

    if (!airportList.length) {
      return this.notFound(res);
    }

    this.ok(res, "Airport list fetched successfully", { airportList, count });
  });

  getAirport = AsyncErrorHandler(async (req, res) => {
    const airport = await this.airportServices.getAirport(req);

    if (!airport) {
      return this.notFound(res);
    }

    this.ok(res, "Airport fetched successfully", { airport });
  });

  patchAirport = AsyncErrorHandler(async (req, res) => {
    const airport = await this.airportServices.patchAirport(req);

    if (!airport) {
      return this.notFound(res);
    }

    this.ok(res, "Airport updated successfully", { airport });
  });

  deleteAirport = AsyncErrorHandler(async (req, res) => {
    const airport = await this.airportServices.softDeleteAirport(req);

    if (!airport) {
      return this.notFound(res);
    }

    this.ok(res, "Airport deleted successfully");
  });
}

module.exports = AirportController;
