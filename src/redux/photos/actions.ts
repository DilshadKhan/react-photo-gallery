import {
  Photo,
  PHOTOS_FETCH_REQUEST,
  PHOTOS_FETCH_RECEIVED,
  PHOTO_VIEW_REQUEST,
  PHOTO_VIEW_RECEIVED,
  ADD_TO_FAVORITE,
  PHOTOS_VISIBILITY_FILTER,
  REQUEST_ERROR,
  PhotoActionTypes
} from './types';

export function requestFetchPhotos(): PhotoActionTypes {
  return {
    type: PHOTOS_FETCH_REQUEST,
    payload: {}
  };
}

export function receivedFetchPhotos(photos: Photo[]): PhotoActionTypes {
  return {
    type: PHOTOS_FETCH_RECEIVED,
    payload: { photos }
  };
}

export function addToFavorite(id: number, albumId: number): PhotoActionTypes {
  return {
    type: ADD_TO_FAVORITE,
    payload: { id, albumId }
  };
}

export function photosVisibilityFilter(value: string): PhotoActionTypes {
  return {
    type: PHOTOS_VISIBILITY_FILTER,
    payload: { value }
  };
}

export function requestViewPhoto(id: number): PhotoActionTypes {
  return {
    type: PHOTO_VIEW_REQUEST,
    payload: { id }
  };
}

export function receivedViewPhoto(photo: Photo): PhotoActionTypes {
  return {
    type: PHOTO_VIEW_RECEIVED,
    payload: { photo }
  };
}

export function errorRequestPhoto(error: string): PhotoActionTypes {
  return {
    type: REQUEST_ERROR,
    payload: { error }
  };
}
