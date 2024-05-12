import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ReactComponent as HomeIcon } from "../../assets/home.svg";
import { ReactComponent as ProfileIcon } from "../../assets/profile.svg";
import { ReactComponent as MenuButtons } from "../../assets/trippleDot.svg";
import Search from "../Search/Search";

import "./Sidebar.css";
import { setAuthenticated } from "../../redux/action";

function Sidebar(props) {
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("user-email");
    props.setAuthenticated(false);
    console.log("User signed out");
    navigate("/login");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-content">
        <div className="sidebar-title">Watchlists</div>
        <div className="sidebar-logo">W</div>
        <div className="sidebar-search">
          <Search search={search} setSearch={setSearch} />
        </div>
        <div className="sidebar-links">
          <button
            type="button"
            className="home-link"
            onClick={() => handleNavigation("/")}
          >
            <HomeIcon alt="home" />
            <span>Home</span>
          </button>
          <hr />

          <div className="my-list">
            <span>My Lists</span>
            {Object.keys(props.wishlist).map((item, index) => (
              <div
                className="wishlist-container"
                key={index}
                onClick={() => handleNavigation(`/wishlist/${item}`)}
              >
                {item}'s Wishlist
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="user-profile">
        {showMenu && (
          <div className="user-menu">
            <button type="button" className="menu-item" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        )}
        <button type="button" className="user-icon" onClick={toggleMenu}>
          <div className="">
            <ProfileIcon alt="profile" />
            <span>USER</span>
          </div>
          <MenuButtons alt="menu buttons" />
        </button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthenticated: (data) => {
      dispatch(setAuthenticated(data));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    wishlist: state.wishlist,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
