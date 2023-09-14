const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookingSchema = new Schema({
  place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Place" },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  price: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  numberOfGuests: { type: Number, required: true },
  name: { type: String, required: true },
  phone: Number,
});

const BookingModel = mongoose.model("Booking", BookingSchema);

module.exports = BookingModel;
