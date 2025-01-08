const express = require("express");

const AuthController = require("../../../auth/v1/controllers/auth.controller");
const authController = new AuthController();

const TicketController = require("../controllers/ticket.controller");
const ticketController = new TicketController();

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrict("admin"),
    ticketController.createTicket
  )
  .get(authController.protect, ticketController.getTicketList);

router
  .route("/:id")
  .get(authController.protect, ticketController.getTicket)
  .patch(
    authController.protect,
    authController.restrict("admin"),
    ticketController.patchTicket
  )
  .delete(
    authController.protect,
    authController.restrict("admin"),
    ticketController.deleteTicket
  );

module.exports = router;
