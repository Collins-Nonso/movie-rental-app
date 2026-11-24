
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    // The user who initiated or owns this transaction.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // The wallet affected by this transaction.
    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      required: true,
    },

    // What kind of financial activity took place?
    type: {
      type: String,
      enum: ["deposit", "withdrawal", "rental_payment", "refund"],
      required: true,
    },

    // Amount in kobo, not naira.
    amountKobo: {
      type: Number,
      required: true,
      min: [1, "Transaction amount must be greater than zero"],
      validate: {
        validator: Number.isSafeInteger,
        message: "Transaction amount must be a whole number of kobo",
      },
    },

    currency: {
      type: String,
      enum: ["NGN"],
      default: "NGN",
    },

    // Current processing state.
    status: {
      type: String,
      enum: ["pending", "successful", "failed", "reversed", "cancelled", "closed"],
      default: "pending",
    },

    // Payment provider or internal wallet operation.
    provider: {
      type: String,
      enum: ["OPay", "Paystack", "Monnify", "internal"],
      default: "internal",
    },

    // Our own unique transaction reference.
    reference: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Reference supplied by an external payment provider.
    providerReference: {
      type: String,
      trim: true,
      default: null,
    },

    description: {
      type: String,
      trim: true,
      maxlength: [250, "Description cannot exceed 250 characters"],
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
