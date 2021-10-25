const express = require("express");
const router = express.Router();
const { User } = require("../models/users");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/", async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");


  const token = user.generateAuthToken();

  res.send(token);
});

const validateAuth = (req) => {
  const schema = {
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(5).required(),
  };

  return Joi.validate(req, schema);
};

module.exports = router;
