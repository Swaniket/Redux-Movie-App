import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/api/movieApi";
import { APIKey } from "../../common/api/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (movieSearchText) => {
    const response = await movieApi.get(
      `?apikey=${APIKey}&s=${movieSearchText}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (seriesSearchText) => {
    const response = await movieApi.get(
      `?apikey=${APIKey}&s=${seriesSearchText}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetailByID = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetailByID",
  async (id) => {
    const response = await movieApi.get(`?apikey=${APIKey}&i=${id}&Plot=full`);
    console.log(response);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
  Loading: false,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSeletedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: (state) => {
      return { ...state, Loading: true };
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, movies: payload, Loading: false };
    },
    [fetchAsyncMovies.rejected]: (state) => {
      return { ...state, Loading: false };
    },

    [fetchAsyncShows.pending]: (state) => {
      return { ...state, Loading: true };
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, shows: payload, Loading: false };
    },
    [fetchAsyncShows.rejected]: (state) => {
      return { ...state, Loading: false };
    },

    [fetchAsyncMovieOrShowDetailByID.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, selectedMovieOrShow: payload };
    },
  },
});

export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getLoadingState = (state) =>  state.movies.Loading;
export const getSelectedMovieOrShow = (state) =>
  state.movies.selectedMovieOrShow;

export const { removeSeletedMovieOrShow } = movieSlice.actions;
export default movieSlice.reducer;
