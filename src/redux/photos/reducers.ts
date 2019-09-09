import {
  PhotoState,
  PHOTOS_FETCH_REQUEST,
  PHOTOS_FETCH_RECEIVED,
  PHOTO_VIEW_REQUEST,
  PHOTO_VIEW_RECEIVED,
  REQUEST_ERROR,
  PhotoActionTypes
} from "./types";

const initialState: PhotoState = {
  loading: false,
  photos: [],
  selectedPhoto: null,
  error: null
};

export function photoReducer(
  state = initialState,
  action: PhotoActionTypes
): PhotoState {
  switch (action.type) {
    case PHOTOS_FETCH_REQUEST:
    case PHOTO_VIEW_REQUEST:
      return { ...state, loading: true }
    case PHOTOS_FETCH_RECEIVED:
      return {
        ...state,
        loading: false,
        photos: [...action.payload.photos]
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
      }
    default:
      return state;
  }
}
