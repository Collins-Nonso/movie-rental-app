
const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Wallet owner is required"],
      unique: true,
    },

    balanceKobo: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Wallet balance cannot be negative"],
      validate: {
        validator: Number.isSafeInteger,
        message: "Wallet balance must be a whole number of kobo",
      },
    },

    currency: {
      type: String,
      enum: ["NGN"],
      default: "NGN",
    },

    status: {
      type: String,
      enum: ["active", "suspended", "closed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
