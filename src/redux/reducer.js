const getUserEmail = () => sessionStorage.getItem("user-email");

const getWishlist = (userEmail) => {
  const wishlist = localStorage.getItem(userEmail);
  return wishlist ? JSON.parse(wishlist) : {};
};

const initialState = {
  isLoading: false,
  movieData: [],
  wishlist: getWishlist(getUserEmail()),
  isAuthenticated: !!getUserEmail(),
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_MOVIE_DATA":
      return { ...state, movieData: action.payload };

    case "ADD_TO_WISHLIST": {
      const { item, wishlistName, wishlistDesc } = action.payload;
      const userEmail = getUserEmail();
      const itemWithDesc = { ...item, wishlistDesc };
      const updatedWishlist = { ...state.wishlist };
      const wishlistItems = updatedWishlist[wishlistName] || [];

      if (
        !wishlistItems.some((wishlistItem) => wishlistItem.Title === item.Title)
      ) {
        updatedWishlist[wishlistName] = [...wishlistItems, itemWithDesc];
      }

      localStorage.setItem(userEmail, JSON.stringify(updatedWishlist));
      return { ...state, wishlist: updatedWishlist };
    }

    case "UPDATE_WISHLIST_DETAILS": {
      const { wishlistName, newWishlistName, newWishlistDesc } = action.payload;
      const userEmail = getUserEmail();
      const updatedWishlist = { ...state.wishlist };

      if (updatedWishlist[wishlistName]) {
        if (newWishlistName && newWishlistName !== wishlistName) {
          updatedWishlist[newWishlistName] = [...updatedWishlist[wishlistName]];
          delete updatedWishlist[wishlistName];
        }

        if (newWishlistDesc) {
          const updatedItems = updatedWishlist[
            newWishlistName || wishlistName
          ].map((item) => ({
            ...item,
            wishlistDesc: newWishlistDesc,
          }));
          updatedWishlist[newWishlistName || wishlistName] = updatedItems;
        }
      }

      localStorage.setItem(userEmail, JSON.stringify(updatedWishlist));
      return { ...state, wishlist: updatedWishlist };
    }

    case "SET_AUTHENTICATED": {
      const userEmail = getUserEmail();
      const isAuthenticated = action.payload;
      const wishlist = isAuthenticated ? getWishlist(userEmail) : {};

      return {
        ...state,
        isAuthenticated,
        wishlist,
      };
    }

    case "REMOVE_FROM_WISHLIST": {
      const { item: itemToRemove, wishlistName: nameToRemoveFrom } =
        action.payload;
      const userEmail = getUserEmail();
      const remainingWishlist = { ...state.wishlist };
      const remainingItems = remainingWishlist[nameToRemoveFrom].filter(
        (wishlistItem) => wishlistItem.Title !== itemToRemove.Title
      );

      remainingWishlist[nameToRemoveFrom] = remainingItems;
      localStorage.setItem(userEmail, JSON.stringify(remainingItems));
      return { ...state, wishlist: remainingWishlist };
    }

    default:
      return state;
  }
};

export default rootReducer;
