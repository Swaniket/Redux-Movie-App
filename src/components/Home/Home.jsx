import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import movieApi from "../../common/api/movieApi";
import { APIKey } from "../../common/api/movieApiKey";
import { MovieListing } from "../../components";
import { addMovies } from "../../redux/movies/movieSlice";

function Home() {
  const dispatch = useDispatch();
  const movieSearchText = "Harry";

  useEffect(() => {   
    const fetchMovies = async () => {
      const response = await movieApi
        .get(`?apikey=${APIKey}&s=${movieSearchText}&type=movie`)
        .catch((err) => {
          console.log(err);
        });
      console.log(response);
      dispatch(addMovies(response.data));
    };

    fetchMovies();
  }, []);

  return (
    <>
      <div className="banner-img"></div>
      <MovieListing />
    </>
  );
}

export default Home;
