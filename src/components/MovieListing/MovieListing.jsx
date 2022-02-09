import React from "react";
import { useSelector } from "react-redux";
import { MovieCard } from "../../components";
import { getAllMovies } from "../../redux/movies/movieSlice";
import "./MovieListing.scss"

function MovieListing() {
  const movies = useSelector(getAllMovies);
  console.log(movies);
  let renderMovies = "";

  renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    ) : (
      <div className="movies-error">{movies.Error}</div>
    );

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">{renderMovies}</div>
      </div>
    </div>
  );
}

export default MovieListing;
