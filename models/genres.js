const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const genresSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 10,
  },
});

const validateGenre = (genre) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
};

const Genres = mongoose.model("Genres", genresSchema);

module.exports = { Genres, validateGenre, genresSchema };
