import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { MovieListing } from "../../components";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../redux/movies/movieSlice";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncMovies());
    dispatch(fetchAsyncShows());
  }, [dispatch]);

  return (
    <>
      <div className="banner-img"></div>
      <MovieListing />
    </>
  );
}

export default Home;
