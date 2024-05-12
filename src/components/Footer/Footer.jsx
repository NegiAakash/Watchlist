import React from "react";
import "./Footer.css";

import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthenticated } from "../../redux/action";
import Popup from "reactjs-popup";

const Footer = (props) => {
  const [isPopupVisible, setIsPopupVisible] = React.useState(false);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const onSignOut = () => {
    sessionStorage.removeItem("user-email");
    props.setAuthenticatedFn(false);
    console.log("User signed out");
    navigate("/login");
  };

  return (
    <footer className="footer-wrapper">
      <div
        className="footer-element"
        onClick={() => {
          handleNavigation("/");
        }}
      >
        Home
      </div>
      <div
        className="footer-element"
        onClick={() => {
          setIsPopupVisible(true);
        }}
      >
        Whishlist
      </div>
      <div className="footer-element" onClick={onSignOut}>
        Signout
      </div>
      <Popup
        open={isPopupVisible}
        position="right center"
        onClose={() => setIsPopupVisible(false)}
      >
        <div className="popup-wrapper">
          <h2>Wishlist</h2>

          {Object.keys(props.wishlist).length > 0 ? (
            <div className="popup-wishlist">
              {Object.keys(props.wishlist).map((item, index) => {
                return (
                  <button
                    type="button"
                    key={index}
                    onClick={() => {
                      handleNavigation(`/wishlist/${item}`);
                      setIsPopupVisible(false);
                    }}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          ) : (
            <h2>No wishlist found</h2>
          )}
        </div>
      </Popup>
    </footer>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    setAuthenticatedFn: (data) => {
      dispatch(setAuthenticated(data));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    wishlist: state.wishlist,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
