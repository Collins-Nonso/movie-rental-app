
const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    // Customer renting the movie.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Rental customer is required"],
    },

    // Movie being rented.
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: [true, "Rental movie is required"],
    },

    // Payment transaction for the rental.
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      default: null,
    },

    // Rental price captured at checkout.
    rentalPriceKobo: {
      type: Number,
      required: true,
      min: [0, "Rental price cannot be negative"],
      validate: {
        validator: Number.isSafeInteger,
        message: "Rental price must be a whole number of kobo",
      },
    },

    currency: {
      type: String,
      enum: ["NGN"],
      default: "NGN",
    },

    // Duration purchased by the customer.
    rentalDurationHours: {
      type: Number,
      required: true,
      min: [1, "Rental duration must be positive"],
      validate: {
        validator: Number.isInteger,
        message: "Rental duration must be a whole number",
      },
    },

    // When the rental becomes active.
    startDate: {
      type: Date,
      default: null,
    },

    // When the customer's access expires.
    endDate: {
      type: Date,
      default: null,
    },

    // Current rental state.
    status: {
      type: String,
      enum: [
        "pending",
        "active",
        "expired",
        "cancelled",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;
