const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    flightNumber: {
      type: String,
      required: [true, "Please enter flight number"],
      unique: [true, "Flight number already exists"],
      maxlength: [10, "Maximum flight number length is 10 characters"],
    },

    airline: {
      type: String,
      required: [true, "Please enter airline"],
      maxlength: [255, "Maximum name length is 255 characters"],
    },

    departureAirportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airport",
      required: [true, "Please enter departure airport"],
    },

    arrivalAirportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airport",
      required: [true, "Please enter arrival airport"],
    },

    price: {
      type: Number,
      required: [true, "Please enter price"],
    },

    departureAt: {
      type: Date,
      required: [true, "Please enter depart at"],
    },

    arrivalAt: {
      type: Date,
      required: [true, "Please enter arrival at"],
    },

    deleted: {
      type: Boolean,
      default: false,
      select: false,
    },

    deletedAt: Date,
  },
  { timestamps: true }
);

ticketSchema.pre(/^find/, async function (next) {
  this.find({ deleted: false }).select("-__v");
  next();
});

ticketSchema.index({ flightNumber: "text", airline: "text", price: "text" });

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
