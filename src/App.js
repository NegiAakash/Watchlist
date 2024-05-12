import "./App.css";
import { connect } from "react-redux";
import { setAuthenticated, setLoading } from "./redux/action";
import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";

import Login from "./pages/Login/Login";
import Error from "./pages/Error/Error";
import Layout from "./components/Layout/Layout";
import Landing from "./components/Landing/Landing";
import Home from "./pages/Home/Home";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Watchlist from "./pages/Watchlist/Watchlist";

function App(props) {
  if (!props.isAuthenticated) {
    <Navigate to="/login" />;
  } else {
    <Navigate to="/" />;
  }
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/wishlist/:name" element={<Watchlist />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (data) => dispatch(setLoading(data)),
    setAuthenticated: (data) => dispatch(setAuthenticated(data)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
