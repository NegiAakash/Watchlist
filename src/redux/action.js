export const setLoading = (isLoading) => ({
  type: "SET_LOADING",
  payload: isLoading,
});

export const setMovieData = (movies) => ({
  type: "SET_MOVIE_DATA",
  payload: movies,
});

export const addToWishlist = (movie) => ({
  type: "ADD_TO_WISHLIST",
  payload: movie,
});

export const removeFromWishlist = (movie) => ({
  type: "REMOVE_FROM_WISHLIST",
  payload: movie,
});

export const setAuthenticated = (isAuthenticated) => ({
  type: "SET_AUTHENTICATED",
  payload: isAuthenticated,
});

// Action creator for updating wishlist details
export const updateWishlistDetails = (
  wishlistName,
  newWishlistName,
  newWishlistDesc
) => ({
  type: "UPDATE_WISHLIST_DETAILS",
  payload: { wishlistName, newWishlistName, newWishlistDesc },
});
