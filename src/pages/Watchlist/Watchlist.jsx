import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { updateWishlistDetails } from "../../redux/action";
import Card from "../../components/Card/Card";
import MovieDetailPopup from "../../components/MovieDetailPopup/MovieDetailPopup";

import "./Watchlist.css";

const Watchlist = ({ wishlist, updateWishlist }) => {
  const [unavailable, setUnavailable] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [cardDetailsData, setCardDetailsData] = useState({});
  const [editableWishlistName, setEditableWishlistName] = useState("");
  const [editableWishlistDesc, setEditableWishlistDesc] = useState("");
  const [editMode, setEditMode] = useState(false);
  const { name: wishlistName } = useParams();

  useEffect(() => {
    if (wishlist[wishlistName]) {
      setEditableWishlistName(wishlistName);
      setEditableWishlistDesc(wishlist[wishlistName][0]?.wishlistDesc || "");
    }
    setUnavailable(Object.keys(wishlist).length <= 0);
  }, [wishlist, wishlistName]);

  const clickHandler = (movieDetails) => {
    setCardDetailsData(movieDetails);
    setIsPopupVisible(true);
  };

  const handleUpdateWishlist = () => {
    updateWishlist(wishlistName, editableWishlistName, editableWishlistDesc);
    setEditMode(false);
  };

  return (
    <>
      {unavailable ? (
        <h1>Wrong page</h1>
      ) : (
        <div className="wishlist-wrapper">
          {editMode ? (
            <div className="editable-wrapper">
              <input
                className="editable-wishlist-name"
                type="text"
                value={editableWishlistName}
                onChange={(e) => setEditableWishlistName(e.target.value)}
              />
              <textarea
                className="editable-wishlist-desc"
                value={editableWishlistDesc}
                onChange={(e) => setEditableWishlistDesc(e.target.value)}
              />
              <button
                className="save-wishlist-changes"
                type="button"
                onClick={handleUpdateWishlist}
              >
                Save
              </button>
            </div>
          ) : (
            <>
              <div className="wishlist-title">{editableWishlistName}</div>
              <div className="wishlist-desc">
                <div>About this watchlist</div>
                <span>{editableWishlistDesc}</span>
                <button
                  className="edit-wishlist"
                  type="button"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
              </div>
            </>
          )}
          <div className="wishlist-body">
            {Array.isArray(wishlist[editableWishlistName]) ? (
              wishlist[editableWishlistName].map((movie, index) => (
                <Card
                  item={movie}
                  key={index}
                  isWatchlisted={true}
                  currentWishlistName={editableWishlistName}
                  onClickEvent={clickHandler}
                />
              ))
            ) : (
              <h2>No movie present</h2>
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

const mapDispatchToProps = (dispatch) => ({
  updateWishlist: (wishlistName, newWishlistName, newWishlistDesc) =>
    dispatch(
      updateWishlistDetails(wishlistName, newWishlistName, newWishlistDesc)
    ),
});

const mapStateToProps = (state) => ({
  wishlist: state.wishlist,
});

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist);
