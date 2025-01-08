const Ticket = require("../models/ticket.model");
const Pagination = require("../../../../common/utils/Pagination");

class TicketService {
  constructor() {
    this.ticketModel = Ticket;
  }

  createTicket = async (req) => {
    return this.ticketModel.create(req.body);
  };

  getTicketList = async (req) => {
    const { query } = req;

    const [paginatedTicketList, count] = new Pagination(this.ticketModel, query)
      .paginate()
      .sort()
      .select()
      .filter()
      .search(["flightNumber", "airline"])
      .run();

    return await Promise.all([paginatedTicketList, count]);
  };

  getTicket = async (req) => {
    return this.ticketModel.findById(req.params.id);
  };
}

module.exports = TicketService;
