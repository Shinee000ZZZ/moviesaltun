import { useEffect, useState } from "react";
import "./App.css";
import { getMovieList, searchMovie } from "./api";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const baseImageUrl = process.env.REACT_APP_BASEIMAGE;

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const handleSearch = async (query) => {
    if (query.trim() === "") {
      setPopularMovies([]); // Clear the movie list if the search query is empty
      return;
    }

    try {
      const results = await searchMovie(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching movies:", error);
      setSearchResults([]);
    }
  };

  const popularMovieList = () => {
    const moviesToDisplay = searchResults.length > 0 ? searchResults : popularMovies;

    return moviesToDisplay.map((movie, i) => (
      <div className="movieWrapper" key={i}>
        <div className="ratingCircle">
          <div className="movieRate">{movie.vote_average}/10</div>
        </div>
        <img
          className="movieImage"
          src={`${baseImageUrl}/w300${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movieTitle">{movie.title}</div>
        <div className="movieDate">{movie.release_date}</div>
      </div>
    ));
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    handleSearch(value);
  };

  return (
    <div className="App">
      <header className="AppHeader">
        <h1>MOVIESALTUN</h1>
        <input
          placeholder="Search here..."
          className="movieSearch"
          onChange={handleInputChange}
        />
        <div className="movieContainer">
          {popularMovieList()}
        </div>
      </header>
    </div>
  );
};

export default App;
