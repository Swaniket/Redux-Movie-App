import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/api/movieApi";
import { APIKey } from "../../common/api/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const movieSearchText = "Marvel";
    const response = await movieApi.get(
      `?apikey=${APIKey}&s=${movieSearchText}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async () => {
    const seriesSearchText = "Marvel";
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
    [fetchAsyncMovies.pending]: () => {
      console.log("Pending...");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected");
    },

    [fetchAsyncShows.pending]: () => {
      console.log("Pending...");
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, shows: payload };
    },
    [fetchAsyncShows.rejected]: () => {
      console.log("Rejected");
    },

    [fetchAsyncMovieOrShowDetailByID.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, selectedMovieOrShow: payload };
    },
  },
});

export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) =>
  state.movies.selectedMovieOrShow;

export const { removeSeletedMovieOrShow } = movieSlice.actions;
export default movieSlice.reducer;
