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
}

module.exports = AirportController;
