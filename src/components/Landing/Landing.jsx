import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { connect, useSelector } from "react-redux"; // Import Redux hook
import { setAuthenticated } from "../../redux/action";
import Home from "../../pages/Home/Home";
import MovieDetails from "../../pages/MovieDetails/MovieDetails";
import Watchlist from "../../pages/Watchlist/Watchlist";

function Landing({ isAuthenticated }) {
  return isAuthenticated ? (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/wishlist/:name" element={<Watchlist />} />
    </Routes>
  ) : (
    <Navigate to="/login" replace />
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthenticated: (data) => dispatch(setAuthenticated(data)),
  };
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
