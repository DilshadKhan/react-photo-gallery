import { createSelector } from "reselect";

const getVisibilityFilter = state => state.photo.selectedFilter;
const getPhotos = state => state.photo;
const getFavoritePhotos = state => state.photo.favorites;

export const getVisiblePhotos = createSelector(
  [getVisibilityFilter, getPhotos, getFavoritePhotos],
  (selectedFilter, photo, favorites) => {
    switch (selectedFilter) {
      case "all":
        return photo.photos;
      case "favorite":
        const result = favorites.map(item => {
          const founded = photo.photos.find(elem => elem.id === item.id);
          return founded;
        });
        return result;
      default:
        return photo.photos;
    }
  }
);
