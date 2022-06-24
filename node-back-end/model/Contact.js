const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    unique: true,
  },
  phone_number: {
    type: Number,
    required: true,
    unique: true,
  },
  marital_status: {
    type: Boolean,
    required: false,
    default: false,
  },
  contact_location: {
    type: Array,
    coordinates: [],
  },
  user_id: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
