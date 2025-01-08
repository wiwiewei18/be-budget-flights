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

  getTicketList = AsyncErrorHandler(async (req, res) => {
    const [ticketList, count] = await this.ticketServices.getTicketList(req);

    if (!ticketList.length) {
      return this.notFound(res);
    }

    this.ok(res, "Ticket list fetched successfully", { ticketList, count });
  });

  getTicket = AsyncErrorHandler(async (req, res) => {
    const ticket = await this.ticketServices.getTicket(req);

    if (!ticket) {
      return this.notFound(res);
    }

    this.ok(res, "Ticket fetched successfully", { ticket });
  });
}

module.exports = TicketController;
