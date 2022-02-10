import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MovieListing } from "../../components";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
  getLoadingState,
} from "../../redux/movies/movieSlice";

function Home() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoadingState)

  const movieText = "Harry";
  const showText = "Marvel";

  useEffect(() => {
    dispatch(fetchAsyncMovies(movieText));
    dispatch(fetchAsyncShows(showText));
  }, [dispatch]);

  return (
    <>
    {isLoading ? (
      <div style={{color: "white"}}>
        Loading...
      </div>
    ) : (
      <>
      <div className="banner-img"></div>
      <MovieListing />
      </>
    )}
      
    </>
  );
}

export default Home;
