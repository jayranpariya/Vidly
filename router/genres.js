const express = require("express");
const router = express.Router();
const { Genres, validateGenre } = require("../models/genres");
const { auth } = require("../middleware/auth");
const { isAdmini } = require("../middleware/admin");
const { functions } = require("lodash");
const { asyncMiddleware } = require("../middleware/async");

router.get("/", auth, async (req, res, next) => {
  const genres = await Genres.find().sort({
    name: 1,
  });

  res.send(genres);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genres({
    name: req.body.name,
  });
  await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genres.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
      },
    },
    { new: true }
  );
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.delete("/:id", auth, isAdmini, async (req, res) => {
  const genre = await Genres.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send("the genre with thr given id");
  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genres.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

module.exports = router;
