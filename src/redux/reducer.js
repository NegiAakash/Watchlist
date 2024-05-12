let user = "";

const initialState = {
  isLoading: false,
  movieData: [],
  wishlist:
    sessionStorage.getItem("user-email") &&
    localStorage.getItem(sessionStorage.getItem("user-email"))
      ? JSON.parse(localStorage.getItem(sessionStorage.getItem("user-email")))
      : {},
  isAuthenticated: sessionStorage.getItem("user-email") ? true : false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_MOVIE_DATA":
      return { ...state, movieData: action.payload };

    case "ADD_TO_WISHLIST":
      const { item, wishlistName } = action.payload;
      user = sessionStorage.getItem("user-email");
      const updatedWishlist = { ...state.wishlist };
      const wishlistItems = updatedWishlist[wishlistName] || [];

      if (
        !wishlistItems.some((wishlistItem) => wishlistItem.Title === item.Title)
      ) {
        updatedWishlist[wishlistName] = [...wishlistItems, item];
      }

      localStorage.setItem(user, JSON.stringify(updatedWishlist));

      return { ...state, wishlist: updatedWishlist };

    case "SET_AUTHENTICATED":
      user = sessionStorage.getItem("user-email");
      const isAuthenticated = action.payload;
      let wishlist = {};
      console.log(user, isAuthenticated);
      if (isAuthenticated && user) {
        wishlist = localStorage.getItem(user)
          ? JSON.parse(localStorage.getItem(user))
          : {};
      }

      return {
        ...state,
        isAuthenticated,
        wishlist,
      };
    case "REMOVE_FROM_WISHLIST":
      const { item: itemToRemove, wishlistName: nameToRemoveFrom } =
        action.payload;
      user = sessionStorage.getItem("user-email");

      const remainingWishlist = { ...state.wishlist };
      console.log(remainingWishlist, nameToRemoveFrom);
      const remainingItems = remainingWishlist[nameToRemoveFrom].filter(
        (wishlistItem) => wishlistItem.Title !== itemToRemove.Title
      );

      remainingWishlist[nameToRemoveFrom] = remainingItems;
      localStorage.setItem(user, JSON.stringify(remainingItems));
      return { ...state, wishlist: remainingWishlist };

    default:
      return state;
  }
};

export default rootReducer;
