const Ticket = require("../models/ticket.model");
const HttpStatusCode = require("../../../../common/constants/HttpStatusCode");
const Pagination = require("../../../../common/utils/Pagination");
const CustomError = require("../../../../common/utils/CustomError");

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

  #validatePatchTicketRequest = (req) => {
    const patchAbleFields = [
      "flightNumber",
      "airline",
      "departureAirportId",
      "arrivalAirportId",
      "price",
      "departureAt",
      "arrivalAt",
    ];

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

  patchTicket = async (req) => {
    this.#validatePatchTicketRequest(req);

    return this.ticketModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  };

  softDeleteTicket = async (req) => {
    return this.ticketModel.findByIdAndUpdate(req.params.id, {
      deleted: true,
      deletedAt: Date.now(),
    });
  };
}

module.exports = TicketService;
