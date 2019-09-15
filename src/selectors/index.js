import { createSelector } from "reselect";

const getVisibilityFilter = state => state.photo.selectedFilter;
const getPhotos = state => state.photo;
const getFavoritePhotos = state => state.photo.favorites;

export const getVisiblePhotos = createSelector(
  [getVisibilityFilter, getPhotos, getFavoritePhotos],
  (selectedFilter, photo, favorites) => {
    switch (selectedFilter) {
      case "all":
        return photo.photos.map(photo => {
          let favorite = false;
          if (favorites.find(favItem => photo.id === favItem.id && photo.albumId === favItem.albumId)) {
            favorite = true;
          }
          return { ...photo, favorite };
        });
      case "favorite":
        return [...photo.favorites];
      default:
        return photo.photos;
    }
  }
);
