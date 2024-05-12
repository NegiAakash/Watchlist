import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import Card from "../../components/Card/Card";
import MovieDetailPopup from "../../components/MovieDetailPopup/MovieDetailPopup";

import "./Watchlist.css";

const Watchlist = (props) => {
  const [unavailable, setUnavailable] = React.useState(false);
  const [isPopupVisible, setIsPopupVisible] = React.useState(false);
  const [cardDetailsData, setCardDetailsData] = React.useState({});

  React.useEffect(() => {
    if (Object.keys(props.wishlist).length <= 0) {
      setUnavailable(true);
    } else {
      setUnavailable(false);
    }
  }, [props.wishlist]);
  const wishlistName = useParams().name;

  function clickHandler(e) {
    setCardDetailsData(e);
    setIsPopupVisible(true);
  }
  return (
    <>
      {unavailable ? (
        <h1>Wrong page</h1>
      ) : (
        <div className="wishlist-wrapper">
          <div className="wishlist-title">{wishlistName}</div>
          <div className="wishlist-desc">
            <div>About this watchlist</div>
            <span>{props.wishlist[wishlistName][0].wishlistDesc}</span>
          </div>
          <div className="wishlist-body">
            {props.wishlist[wishlistName].length <= 0 ? (
              <h2>No movie present</h2>
            ) : (
              props.wishlist[wishlistName].map((it, index) => {
                return (
                  <Card
                    item={it}
                    key={index}
                    isWatchlisted={true}
                    currentWishlistName={wishlistName}
                    onClickEvent={clickHandler}
                  />
                );
              })
            )}
          </div>
        </div>
      )}

      <MovieDetailPopup
        isPopupVisible={isPopupVisible}
        setIsPopupVisible={setIsPopupVisible}
        movie={cardDetailsData}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    // removeFromWishlist: (data) => dispatch(removeFromWishlist(data)),
  };
};
const mapStateToProps = (state) => {
  return {
    wishlist: state.wishlist,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist);
