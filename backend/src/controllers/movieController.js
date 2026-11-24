
const Movie = require("../models/Movie");

// GET /api/v1/movies
// Retrieve all movies from MongoDB.
const getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({
      isDeleted: { $ne: true },
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/movies/:id
// Retrieve a single movie by its ID from MongoDB.
const getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check whether the ID has a valid MongoDB ObjectId format.
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie ID format",
      });
    }

    // Search MongoDB for the requested movie.
    const movie = await Movie.findOne({
      _id: id,
      isDeleted: { $ne: true },
    });

    // Handle a valid ID that does not exist.
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    // Return the movie.
    return res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};


// POST /api/v1/movies
// Create a new movie.
const createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Movie created successfully",
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};


// PATCH /api/v1/movies/:id
// Partially update an existing movie.
const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format.
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie ID format",
      });
    }

    // Update the movie using validated request data.
    const movie = await Movie.findOneAndUpdate(
      {
        _id: id,
        isDeleted: { $ne: true },
      },
      {
        $set: req.body,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    // Handle a movie that does not exist.
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/movies/:id
// Soft-delete a movie.
const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format.
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie ID format",
      });
    }

    // Archive the movie instead of permanently deleting it.
    const movie = await Movie.findOneAndUpdate(
      {
        _id: id,
        isDeleted: { $ne: true },
      },
      {
        $set: {
          isDeleted: true,
          deletedAt: new Date(),
          isAvailable: false,
          isPublished: false,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    // Handle nonexistent or already deleted movies.
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found or already deleted",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
      data: {
        id: movie._id,
        title: movie.title,
        isDeleted: movie.isDeleted,
        deletedAt: movie.deletedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
