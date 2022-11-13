const router = require("express").Router();

const Movie = require("../models/movies.model");
const data = require("../config/data.json");

// insert into db
const insertManyMovies = async () => {
  try {
    const docs = await Movie.insertMany(movies);
    return Promise.resolve(docs);
  } catch (error) {
    return Promise.reject(err);
  }
};

router.get("/movies", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "rating";
    let genre = req.query.genre;

    const genreOptions = [
			"Action",
			"Romance",
			"Fantasy",
			"Drama",
			"Crime",
			"Adventure",
			"Thriller",
			"Sci-fi",
			"Music",
			"Family",
		];


  } catch (error) {}
});

insertManyMovies()
  .then((docs) => {
    console.log(docs);
  })
  .catch((err) => {
    console.log(err);
  });
