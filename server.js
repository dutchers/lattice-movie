const express = require("express");
const path = require("path");
const app = express();
const port = 3030;
const MovieDatabaseService = require("./services/movie-database").service;

const instantiateService = (req, res, next) => {
  if (!res.locals.movieService) {
    res.locals.movieService = new MovieDatabaseService();
  }
  next();
};

app.use(instantiateService);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(path.join(__dirname, "./build")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./build", "index.html"))
);

app.get("/api/movies/popular", (req, res, next) => {
  const { movieService } = res.locals;
  movieService
    .popular()
    .then((resp) => {
      console.log("getting a response");
      res.json(resp);
    })
    .catch((e) => next(e));
});

app.get("/api/movies/detail/:id", (req, res, next) => {
  const { id } = req.params;
  const { movieService } = res.locals;
  movieService
    .detail(id)
    .then((resp) => {
      res.json(resp);
    })
    .catch((e) => next(e));
});

app.get("/api/movies/search", (req, res, next) => {
  const { q } = req.query;
  const { movieService } = res.locals;
  movieService
    .search(q)
    .then((resp) => res.json(resp))
    .catch((e) => next(e));
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
