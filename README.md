## Use Redux Toolkit with React

**Dependency: "@reduxjs/toolkit": "^1.7.2", "react-redux": "^7.2.6", "redux": "^4.1.2"**


**Store:**
Where you have to register your reducer(That is your application state)

Create a separate store.js for declaring a store.

        import { configureStore } from "@reduxjs/toolkit";
        import moviesReducer from "./movies/movieSlice";

        export const store = configureStore({
            reducer: {
                movies: moviesReducer,
            },
        });

Register the store in the index.js file with provider.
        
        import React from "react";
        import ReactDOM from "react-dom";
        import { BrowserRouter } from "react-router-dom";
        import { Provider } from "react-redux";
        import { store } from "./redux/store";
        import App from "./App";

        ReactDOM.render(
            <React.StrictMode>
                <Provider store={store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>
            </React.StrictMode>,
            document.getElementById("root")
        );


**Reducer:**
It's kind of like the global state of the application. Complex application can have multiple reducers. 

        import { configureStore } from "@reduxjs/toolkit";
        import moviesReducer from "./movies/movieSlice";
        import showReducer from "./shows/showSlice";

        export const store = configureStore({
            reducer: {
                movies: moviesReducer,
                shows: showReducer,
            },
        });


**Slicer:**
It's the brain or the logic portion of the state. It has a few parts to it.
1. The Initial state.

        const initialState = {
        movies: {},
        shows: {},
        selectedMovieOrShow: {},
        Loading: false,
        };

2. Create Slicer with that state.

        const movieSlice = createSlice({
            name: "movies",
            initialState,
            reducers: {
                removeSeletedMovieOrShow: (state) => {
                state.selectedMovieOrShow = {};
                },
            },
        });

In the reducer array, declare the actions(Synchronous)


**API Call with Axios & createAsyncThunk**
1. Create `movieApi.js` file:

        import axios from "axios";

        export default axios.create({
            baseURL: "https://www.omdbapi.com",
            
        })

2. In Your Slicer file: 

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


**Note: createAsyncThunk is used to make async state updation such as with API calls**