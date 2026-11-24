
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Movie title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
    },

    description: {
      type: String,
      required: [true, "Movie description is required"],
      trim: true,
    },

    genres: {
      type: [String],
      required: true,
      validate: {
        validator: (genres) => genres.length > 0,
        message: "At least one genre is required",
      },
    },

    releaseYear: {
      type: Number,
      required: true,
      min: [1888, "Invalid release year"],
      validate: {
        validator: Number.isInteger,
        message: "Release year must be a whole number",
      },
    },

    durationMinutes: {
      type: Number,
      required: true,
      min: [1, "Movie duration must be positive"],
      validate: {
        validator: Number.isInteger,
        message: "Movie duration must be a whole number",
      },
    },

    language: {
      type: String,
      trim: true,
      default: "English",
    },

    posterUrl: {
      type: String,
      trim: true,
      default: null,
    },

    rentalPriceKobo: {
      type: Number,
      required: true,
      min: [0, "Rental price cannot be negative"],
      validate: {
        validator: Number.isSafeInteger,
        message: "Rental price must be a whole number of kobo",
      },
    },

    rentalDurationHours: {
      type: Number,
      required: true,
      min: [1, "Rental duration must be positive"],
      validate: {
        validator: Number.isInteger,
        message: "Rental duration must be a whole number",
      },
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    // Indicates whether the movie has been soft-deleted.
    isDeleted: {
      type: Boolean,
      default: false,
    },

    // Records when the movie was deleted.
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
