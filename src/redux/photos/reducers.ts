import {
  PhotoState,
  PHOTOS_FETCH_REQUEST,
  PHOTOS_FETCH_RECEIVED,
  PHOTO_VIEW_REQUEST,
  PHOTO_VIEW_RECEIVED,
  ADD_TO_FAVORITE,
  TOGGLE_PHOTOS_FILTER,
  REQUEST_ERROR,
  PhotoActionTypes,
  Photo
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
    case TOGGLE_PHOTOS_FILTER:
      let tempFavorites = [...state.favorites];
      let tempPhotos = [...state.photos];
      const result = tempFavorites.map(item => {
        const founded = tempPhotos.find(elem => elem.id === item.id);

        return founded;
      }) as Photo[];

      return {
        ...state,
        loading: false,
        photos: [...result]
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
