import React, { useEffect } from "react";
import movieApi from "../../common/api/movieApi";
import { APIKey } from "../../common/api/movieApiKey";
import { MovieListing } from "../../components";

function Home() {
  useEffect(() => {
    const movieSearchText = "Harry";
    const fetchMovies = async () => {
      const response = await movieApi
        .get(`?apikey=${APIKey}&s=${movieSearchText}&type=movie`)
        .catch((err) => {
          console.log(err);
        });
      console.log(response);
    };

    fetchMovies()
  }, []);

  return (
    <>
      <div className="banner-img"></div>
      <MovieListing />
    </>
  );
}

export default Home;
