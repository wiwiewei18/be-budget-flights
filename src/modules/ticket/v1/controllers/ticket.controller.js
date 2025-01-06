const TicketServices = require("../services/ticket.services");
const AirportServices = require("../../../../common/services/airport.services");

const BaseController = require("../../../../common/controllers/base.controller");
const AsyncErrorHandler = require("../../../../common/utils/AsyncErrorHandler");

class TicketController extends BaseController {
  constructor() {
    super();

    this.ticketServices = new TicketServices();
    this.airportServices = new AirportServices();
  }

  createTicket = AsyncErrorHandler(async (req, res) => {
    const { departureAirportId, arrivalAirportId } = req.body;

    const departureAirport = await this.airportServices.getAirportById(
      departureAirportId
    );
    if (!departureAirport) {
      return this.notFound(res, "Departure airport not found");
    }

    const arrivalAirport = await this.airportServices.getAirportById(
      arrivalAirportId
    );
    if (!arrivalAirport) {
      return this.notFound(res, "Arrival airport not found");
    }

    const ticket = await this.ticketServices.createTicket(req);

    this.ok(res, "Ticket created successfully", { ticket });
  });
}

module.exports = TicketController;
