import React from "react";
import "./Card.css";
import { movieCardDetails } from "../../util/constants";
import { ReactComponent as GreatIcon } from "../../assets/green_smiley.svg";
import { ReactComponent as GoodIcon } from "../../assets/yellow_smiley.svg";
import { ReactComponent as BadIcon } from "../../assets/red_smiley.svg";
import { ReactComponent as BookmarkIcon } from "../../assets/bookmark.svg";
import { addToWishlist, removeFromWishlist } from "../../redux/action";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const Card = ({
  item,
  wishlist,
  setWishlist,
  isWatchlisted = false,
  removeWishlist,
  currentWishlistName,
  onClickEvent = () => {},
}) => {
  const [isPopupVisible, setIsPopupVisible] = React.useState(false);
  const [wishlistName, setwishlistName] = React.useState("");

  const validElements = Object.keys(item).filter((i) =>
    movieCardDetails.includes(i)
  );

  function showRating(rating) {
    const actualRating = rating.split("/")[0];

    if (actualRating > 7) {
      return (
        <div className="movie-rating">
          <GreatIcon />
          <span className="rating-number"> &nbsp;{rating}</span>
        </div>
      );
    } else if (actualRating < 7 && actualRating > 5) {
      return (
        <div className="movie-rating">
          <GoodIcon />
          <span className="rating-number"> &nbsp;{rating}</span>
        </div>
      );
    } else if (actualRating < 5) {
      return (
        <div className="movie-rating">
          <BadIcon />
          <span className="rating-number"> &nbsp;{rating}</span>
        </div>
      );
    }
  }

  function handleBookmark() {
    if (!isWatchlisted) {
      setIsPopupVisible(true);
    } else {
      removeWishlist({ item, wishlistName: currentWishlistName });
    }
    //
  }
  return (
    <div className="card-wrapper" key={item.title}>
      <div className="bookmark-icon">
        <BookmarkIcon onClick={handleBookmark} />
      </div>
      <div className="card-poster">
        <img src={item.Poster} alt={item.title} />
      </div>
      <div className="card-details" onClick={() => onClickEvent(item)}>
        <div className="card-rating">{showRating(item.Ratings[0].Value)}</div>
        {validElements.map((i, index) => {
          let element = index === 1 ? `(${item[i]})` : item[i];

          return (
            <div className={`card-movie-item-${index}`} key={index}>
              {element ?? null}
            </div>
          );
        })}
      </div>
      <Popup
        open={isPopupVisible}
        position="right center"
        onClose={() => setIsPopupVisible(false)}
      >
        <div className="popup-wrapper">
          <h2>Wishlist</h2>

          <input
            type="text"
            name="wishlistName"
            id="watch-list-name"
            placeholder="Please enter watchlist name"
            value={wishlistName}
            onChange={(e) => setwishlistName(e.target.value)}
          />
          <button
            type="button"
            disabled={wishlistName.length <= 0}
            onClick={() => {
              if (!isWatchlisted) {
                setWishlist({
                  wishlistName: wishlistName.toUpperCase(),
                  item: item,
                });
                setIsPopupVisible(false);
                alert(`Wishlisted!!`);
                setwishlistName("");
              }
            }}
          >
            Save
          </button>
        </div>
      </Popup>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setWishlist: (data) => {
      dispatch(addToWishlist(data));
    },
    removeWishlist: (data) => {
      dispatch(removeFromWishlist(data));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    wishlist: state.wishlist,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
