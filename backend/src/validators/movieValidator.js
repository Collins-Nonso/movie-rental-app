
const Joi = require("joi");

// Validation schema for creating a movie.
const createMovieSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(1)
    .max(150)
    .required(),

  description: Joi.string()
    .trim()
    .min(1)
    .required(),

  genres: Joi.array()
    .items(Joi.string().trim().min(1))
    .min(1)
    .required(),

  releaseYear: Joi.number()
    .integer()
    .min(1888)
    .required(),

  durationMinutes: Joi.number()
    .integer()
    .min(1)
    .required(),

  language: Joi.string()
    .trim()
    .default("English"),

  posterUrl: Joi.string()
    .uri({ scheme: ["http", "https"] })
    .allow(null)
    .default(null),

  rentalPriceKobo: Joi.number()
    .integer()
    .min(0)
    .max(Number.MAX_SAFE_INTEGER)
    .required(),

  rentalDurationHours: Joi.number()
    .integer()
    .min(1)
    .required(),

  isAvailable: Joi.boolean()
    .default(true),

  isPublished: Joi.boolean()
    .default(false),
}).required();

// Validation schema for partially updating a movie.
const updateMovieSchema = createMovieSchema
  .fork(
    Object.keys(createMovieSchema.describe().keys),
    (schema) => schema.optional()
  )
  .min(1)
  .prefs({
    noDefaults: true,
  });

module.exports = {
  createMovieSchema,
  updateMovieSchema,
};
