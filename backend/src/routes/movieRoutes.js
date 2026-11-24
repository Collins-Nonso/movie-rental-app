
const express = require("express");

const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

const validate = require("../middleware/validate");

const {
  createMovieSchema,
  updateMovieSchema,
} = require("../validators/movieValidator");

const router = express.Router();

// Retrieve all non-deleted movies.
router.get("/", getAllMovies);

// Retrieve a single non-deleted movie.
router.get("/:id", getMovieById);

// Create a movie.
router.post(
  "/",
  validate(createMovieSchema),
  createMovie
);

// Update a movie.
router.patch(
  "/:id",
  validate(updateMovieSchema),
  updateMovie
);

// Soft-delete a movie.
router.delete("/:id", deleteMovie);

module.exports = router;
