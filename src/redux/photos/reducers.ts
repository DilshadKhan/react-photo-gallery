import {
  PhotoState,
  PHOTOS_FETCH_REQUEST,
  PHOTOS_FETCH_RECEIVED,
  PHOTO_VIEW_REQUEST,
  PHOTO_VIEW_RECEIVED,
  ADD_TO_FAVORITE,
  PHOTOS_VISIBILITY_FILTER,
  REQUEST_ERROR,
  PhotoActionTypes,
  Photo
} from "./types";

const initialState: PhotoState = {
  loading: false,
  photos: [],
  selectedPhoto: null,
  error: null,
  favorites: [],
  selectedFilter: "all",
  pagination: {
    total: 0,
    page: 1,
    pageSize: 12
  }
};

const hydrateFavorites = () => {
  const favorites: Photo[] = JSON.parse(localStorage.getItem("favorite-photos") || "[]");
  return { ...initialState, favorites: favorites };
};

export function photoReducer(state = hydrateFavorites(), action: PhotoActionTypes): PhotoState {
  switch (action.type) {
    case PHOTOS_FETCH_REQUEST:
    case PHOTO_VIEW_REQUEST:
      return { ...state, loading: true };
    case PHOTOS_FETCH_RECEIVED:
      return {
        ...state,
        loading: false,
        photos: [...action.payload.photos],
        pagination: { ...action.payload.pagination }
      };
    case ADD_TO_FAVORITE:
      let favorites = [...state.favorites];
      const foundedIndex: number = favorites.findIndex(item => item.id === action.payload.photo.id && item.albumId === action.payload.photo.albumId);
      if (foundedIndex === -1) {
        favorites.push({ ...action.payload.photo, favorite: true });
      } else {
        favorites.splice(foundedIndex, 1);
      }
      return {
        ...state,
        loading: false,
        favorites: [...favorites]
      };
    case PHOTOS_VISIBILITY_FILTER:
      return {
        ...state,
        loading: false,
        selectedFilter: action.payload.value
      };
    case PHOTO_VIEW_RECEIVED:
      return {
        ...state,
        loading: false,
        selectedPhoto: { ...action.payload.photo }
      };
    case REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
