const TicketServices = require("../services/ticket.services");

const BaseController = require("../../../../common/controllers/base.controller");
const AsyncErrorHandler = require("../../../../common/utils/AsyncErrorHandler");

class TicketController extends BaseController {
  constructor() {
    super();

    this.ticketServices = new TicketServices();
  }

  createTicket = AsyncErrorHandler(async (req, res) => {
    const ticket = await this.ticketServices.createTicket(req);

    this.ok(res, "Ticket created successfully", { ticket });
  });
}

module.exports = TicketController;
