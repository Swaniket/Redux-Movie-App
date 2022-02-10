import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import user from "../../images/user.png";
import { fetchAsyncMovies, fetchAsyncShows } from "../../redux/movies/movieSlice";
import "./Header.scss";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(searchTerm);
    dispatch(fetchAsyncMovies(searchTerm))
    dispatch(fetchAsyncShows(searchTerm))
    setSearchTerm("")
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Movie App</Link>
      </div>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={searchTerm}
            placeholder="Search Movies or Shows"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>

      <div className="user-image">
        <img src={user} alt="user" />
      </div>
    </div>
  );
}

export default Header;
