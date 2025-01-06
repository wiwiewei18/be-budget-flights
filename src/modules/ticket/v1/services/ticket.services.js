const Ticket = require("../models/ticket.model");

class TicketService {
  constructor() {
    this.ticketModel = Ticket;
  }

  createTicket = async (req) => {
    return this.ticketModel.create(req.body);
  };
}

module.exports = TicketService;
