const mongoose = require("mongoose");

const airportSchema = new mongoose.Schema(
  {
    iataCode: {
      type: String,
      required: [true, "Please enter IATA code"],
      unique: [true, "IATA code already exists"],
      maxlength: [10, "Maximum IATA code length is 10 characters"],
    },

    name: {
      type: String,
      required: [true, "Please enter name"],
      maxlength: [255, "Maximum name length is 255 characters"],
    },

    country: {
      type: String,
      required: [true, "Please enter country"],
      maxlength: [255, "Maximum country length is 255 characters"],
    },

    city: {
      type: String,
      required: [true, "Please enter city"],
      maxlength: [255, "Maximum city length is 255 characters"],
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

airportSchema.pre(/^find/, async function (next) {
  this.find({ deleted: false }).select("-__v");
  next();
});

airportSchema.index({
  iataCode: "text",
  name: "text",
  country: "text",
  city: "text",
});

const Airport = mongoose.model("Airport", airportSchema);

module.exports = Airport;
