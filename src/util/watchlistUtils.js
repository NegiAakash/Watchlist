function addToWishlist(globalWishlist, wishlistName, item) {
  if (globalWishlist.includes(wishlistName)) {
    globalWishlist = [...globalWishlist, { wishlistName: item }];
  }
  return globalWishlist;
}

export default addToWishlist;
