import {
  PhotoState,
  PHOTOS_FETCH_REQUEST,
  PHOTOS_FETCH_RECEIVED,
  PHOTO_VIEW_REQUEST,
  PHOTO_VIEW_RECEIVED,
  ADD_TO_FAVORITE,
  PHOTOS_VISIBILITY_FILTER,
  REQUEST_ERROR,
  PhotoActionTypes
} from './types';

const initialState: PhotoState = {
  loading: false,
  photos: [],
  selectedPhoto: null,
  error: null,
  favorites: [],
  selectedFilter: 'all'
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

      const foundedIndex: number = tempFav.findIndex(
        item => item.id === action.payload.id
      );

      if (foundedIndex === -1) {
        tempFav.push({ ...action.payload });
      } else {
        tempFav.splice(foundedIndex, 1);
      }

      return {
        ...state,
        loading: false,
        favorites: tempFav
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
