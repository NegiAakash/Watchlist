import React from "react";
import { connect } from "react-redux";
import { getApiCall } from "../../util/apiCallHandler";
import { ReactComponent as SearchIcon } from "../../assets/searchIcon.svg";
import "./Search.css";
import { addToWishlist, setLoading, setMovieData } from "../../redux/action";
import { useNavigate } from "react-router-dom";

function Search({ hasbutton = false, setLoading, setMovieData }) {
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  async function getMovieData() {
    setLoading(true);
    const data = await getApiCall("https://www.omdbapi.com/", search);

    if (!data.isError) {
      console.log(data);
      setMovieData([data]);
      handleNavigation("/");
    } else {
      alert("Something went wrong please try again later.");
    }
    setLoading(false);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter" && search.length > 0) {
      getMovieData();
    }
  }
  return (
    <div hasbutton={hasbutton} className="search-wrapper">
      <SearchIcon className="search-icon" />
      <input
        type="text"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        onKeyUp={handleKeyPress}
      />
      {hasbutton ? (
        <button type="button" onClick={getMovieData}>
          Search
        </button>
      ) : null}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (data) => dispatch(setLoading(data)),
    setMovieData: (data) => dispatch(setMovieData(data)),
    addToWishlist: (data) => dispatch(addToWishlist(data)),
  };
};
const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
