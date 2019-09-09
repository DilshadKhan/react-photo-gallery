import {
  Photo,
  PHOTOS_FETCH_REQUEST,
  PHOTOS_FETCH_RECEIVED,
  PHOTO_VIEW_REQUEST,
  PHOTO_VIEW_RECEIVED,
  REQUEST_ERROR,
  PhotoActionTypes
} from "./types";


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