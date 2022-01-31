const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  organizer: { type: String, maxlength: 20, unique: true },
  name: {
    type: String,
    required: true,
    validate: [
      function (value) {
        return !value.includes("event");
      },
    ],
  },
  email: {
    type: String,
    validate: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  image: { type: String, required: true },
  numberOfSeats: { type: Number, min: 5 },
  bookedSeats: {
    type: Number,
    default: 0,
    validate: [
      function (value) {
        return this.numberOfSeats >= value;
      },
    ],
  },
  startDate: { type: Date, default: Date.now() + 1 },
  endDate: {
    type: Date,
    validate: [
      function (value) {
        return this.startDate < value;
      },
    ],
  },
});
module.exports = mongoose.model("Event", EventSchema);
