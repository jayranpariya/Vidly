const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 5,
    maxLength: 255,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 10000,
  },
  isAdmin: Boolean,
  // role: [],
  // operations: [],
});

usersSchema.methods = {
  generateAuthToken: function () {
    return jwt.sign(
      { _id: this._id, isAdmin: this.isAdmin },
      config.get("jwtPrivateKey")
    );
  },
};

const validateUser = (user) => {
  const schema = {
    name: Joi.string().min(5).required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(5).required(),
  };

  return Joi.validate(user, schema);
};

const User = mongoose.model("User", usersSchema);

module.exports = { User, validateUser, usersSchema };
