import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import "../styles/tailwind.css";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch("http://localhost:3030/api/movies/popular", {
          mode: "cors",
        });
        const movies = await resp.json();
        setPopularMovies(movies.results);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [popularMovies.page]);

  const [searchQuery, setSearchQuery] = useState("");

  const search = async () => {
    try {
      const resp = await fetch(
        `http://localhost:3030/api/movies/search?q=${searchQuery}`
      );
      const movies = await resp.json();
      setPopularMovies(movies.results);
    } catch (e) {
      console.log(e);
    }

    console.log(searchQuery);
  };
  return (
    <div className="App">
      <header className="p-4 border-b border-gray-300">
        <h1 className="text-lg uppercase tracking-wider">
          Lattice Movie Finder
        </h1>
      </header>
      <main>
        <div>
          <div className="flex justify-center items-center w-full py-10">
            <input
              type="search"
              placeholder="Search by movie title"
              value={searchQuery}
              onChange={(evt) => setSearchQuery(evt.target.value)}
              className="border border-gray-400 rounded p-1 mr-2 w-1/4"
            />
            <button
              type="submit"
              onClick={search}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
            >
              Search
            </button>
          </div>
        </div>

        <ul className="list-none flex flex-wrap px-4">
          {popularMovies.map((movie) => {
            const IMG_PATH = "https://image.tmdb.org/t/p/w500/";
            return (
              <li className="w-1/4 px-2 mb-6">
                <div>
                  <img src={`${IMG_PATH}${movie.poster_path}`} />
                  <div className="p-2">
                    <Link to={`/detail/${movie.id}`}>
                      <h3 className="text-lg font-bold mb-2 text-blue-500 underline">
                        {movie.title}
                      </h3>
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default App;
