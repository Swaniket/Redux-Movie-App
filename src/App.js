import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";

import { Home, Header, Footer, MovieDetails, PageNotFound } from "./components";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/movie/:imdbID" element={<MovieDetails />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
