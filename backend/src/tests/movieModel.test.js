
require("dotenv").config();

const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
const connectDB = require("../config/database");
const Movie = require("../models/Movie");

const testMovieModel = async () => {
  try {
    // Step 1: Connect to MongoDB Atlas.
    await connectDB();

    // Step 2: Create a fictional movie.
    const movie = await Movie.create({
      title: "The Last Journey",
      description: "A fictional adventure movie for database testing.",
      genres: ["Action", "Drama"],
      releaseYear: 2025,
      durationMinutes: 120,
      language: "English",
      rentalPriceKobo: 150000,
      rentalDurationHours: 48,
      isAvailable: true,
      isPublished: false,
    });

    console.log("Movie created successfully!");
    console.log("Movie ID:", movie._id.toString());

    // Step 3: Retrieve the same movie from MongoDB.
    const savedMovie = await Movie.findById(movie._id);

    if (!savedMovie) {
      throw new Error("Movie could not be retrieved");
    }

    console.log("Movie retrieved successfully!");
    console.log("Title:", savedMovie.title);
    console.log("Genres:", savedMovie.genres);
    console.log("Rental price (kobo):", savedMovie.rentalPriceKobo);
    console.log("Rental duration (hours):", savedMovie.rentalDurationHours);
  } catch (error) {
    console.error("Movie model test failed:", error.message);
    process.exitCode = 1;
  } finally {
    // Always close the database connection.
    await mongoose.disconnect();
  }
};

testMovieModel();
