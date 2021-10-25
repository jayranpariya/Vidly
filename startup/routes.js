const express = require("express");
const genres = require("../router/genres");
const customers = require("../router/customer");
const movies = require("../router/movies");
const rentals = require("../router/rentals");
const users = require("../router/users");
const auth = require("../router/auth");
const { error } = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
  // console.log(process.env);
};
