import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { MovieCard } from "../../components";
import { getAllMovies, getAllShows } from "../../redux/movies/movieSlice";
import "./MovieListing.scss";
import { sliderSettings } from "../../common/sliderSettings";

function MovieListing() {
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);

  let renderMovies = "";
  let renderShows = "";

  renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    ) : (
      <div className="movies-error">{movies.Error}</div>
    );

  renderShows =
    shows.Response === "True" ? (
      shows.Search.map((show, index) => <MovieCard key={index} data={show} />)
    ) : (
      <div className="shows-error">{shows.Error}</div>
    );

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">
          <Slider {...sliderSettings}>{renderMovies}</Slider>
        </div>
      </div>

      <div className="show-list">
        <h2>Shows</h2>
        <div className="movie-container">
          <Slider {...sliderSettings}>{renderShows}</Slider>
        </div>
      </div>
    </div>
  );
}

export default MovieListing;
