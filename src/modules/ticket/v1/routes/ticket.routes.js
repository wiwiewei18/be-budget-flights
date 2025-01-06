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
  );

module.exports = router;
