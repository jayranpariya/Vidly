const express = require("express");
const router = express.Router();
const { Movie, validateMovie } = require("../models/movies");
const { Genres } = require("../models/genres");

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort({
    numberInStock: 1,
  });

  res.send(movies);
});

// async function addmovie() {
//   const movies = new Movie({
//     title: "jay",
//     genre: "61692d11a2e41e9b0ce3c59a",
//     numberInStock: 50,
//     dailyRentalRate: 3,
//   });

//   const result = await movies.save();
//   console.log(result);
// }
// // addmovie();

// async function listMovies() {
//   const courses = await Movie.find().populate("genre", "-_id").select("-_id");

//   console.log(courses);
// }

// listMovies();

router.post("/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genres.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movies = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  
  await movies.save();
  res.send(movies);
});

router.put("/:id", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genres.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const updatemovies = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
      },
    },
    { new: true }
  );
  if (!updatemovies)
    return res.status(404).send("The movies with the given ID was not found.");

  res.send(updatemovies);
  res.send(updatemovies);
});

router.delete("/:id", async (req, res) => {
  const movies = await Movie.findByIdAndRemove(req.params.id);
  if (!movies) return res.status(404).send("the movies with thr given id");
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movies = await Movie.findById(req.params.id);
  if (!movies) {
    res.status(400).send("The movies with the given ID was not found.");
  }
  res.send(movies);
});

module.exports = router;
