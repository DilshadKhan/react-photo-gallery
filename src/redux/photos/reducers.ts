import {
  PhotoState,
  PHOTOS_FETCH_REQUEST,
  PHOTOS_FETCH_RECEIVED,
  PHOTO_VIEW_REQUEST,
  PHOTO_VIEW_RECEIVED,
  ADD_TO_FAVORITE,
  REQUEST_ERROR,
  PhotoActionTypes
} from './types';

const initialState: PhotoState = {
  loading: false,
  photos: [],
  selectedPhoto: null,
  error: null,
  favorites: []
};

export function photoReducer(
  state = initialState,
  action: PhotoActionTypes
): PhotoState {
  switch (action.type) {
    case PHOTOS_FETCH_REQUEST:
    case PHOTO_VIEW_REQUEST:
      return { ...state, loading: true };
    case PHOTOS_FETCH_RECEIVED:
      return {
        ...state,
        loading: false,
        photos: [...action.payload.photos]
      };
    case ADD_TO_FAVORITE:
      let tempFav = [...state.favorites];
      tempFav.push({ ...action.payload });
      return {
        ...state,
        loading: false,
        favorites: tempFav
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
