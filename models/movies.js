const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const { genresSchema } = require("./genres");

const moviesSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 255,
  },
  genre: {
    // type: mongoose.Schema.Types.ObjectId,
    type: genresSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(3).max(50).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  };
  return Joi.validate(movie, schema);
}

const Movie = mongoose.model("Movie", moviesSchema);

module.exports = { Movie, validateMovie };
