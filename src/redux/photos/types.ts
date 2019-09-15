import { Action } from "redux";
export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  favorite: boolean
}

export interface Pagination {
  total: number;
  pageSize: number;
  page: number
}


export interface PhotoState {
  loading: boolean;
  photos: Photo[];
  selectedPhoto: Photo | null;
  error: string | null;
  favorites: Photo[];
  selectedFilter: string;
  pagination: Pagination
}


export const PHOTOS_FETCH_REQUEST = "photos/FETCH_REQUEST";
export const PHOTOS_FETCH_RECEIVED = "photos/FETCH_RECEIVED";
export const ADD_TO_FAVORITE = "photos/ADD_TO_FAVORITE";
export const PHOTOS_VISIBILITY_FILTER = "photos/PHOTOS_VISIBILITY_FILTER";
export const PHOTO_VIEW_REQUEST = "photos/VIEW_REQUEST";
export const PHOTO_VIEW_RECEIVED = "photos/VIEW_RECEIVED";
export const REQUEST_ERROR = "photos/ERROR";

export interface RequestPhotosFetchAction extends Action {
  type: typeof PHOTOS_FETCH_REQUEST;
  payload: { pagination: Pagination };
}

export interface ReceivedPhotosFetchAction extends Action {
  type: typeof PHOTOS_FETCH_RECEIVED;
  payload: { photos: Photo[], pagination: Pagination };
}

export interface AddToFavorite extends Action {
  type: typeof ADD_TO_FAVORITE;
  payload: { photo: Photo };
}

export interface PhotosVisibilityFilter extends Action {
  type: typeof PHOTOS_VISIBILITY_FILTER;
  payload: { value: string };
}

export interface RequestPhotoViewAction extends Action {
  type: typeof PHOTO_VIEW_REQUEST;
  payload: { id: number };
}

export interface ReceivedPhotoViewAction extends Action {
  type: typeof PHOTO_VIEW_RECEIVED;
  payload: { photo: Photo };
}

export interface ErrorRequestAction extends Action {
  type: typeof REQUEST_ERROR;
  payload: { error: string };
}

export type PhotoActionTypes =
  | RequestPhotosFetchAction
  | ReceivedPhotosFetchAction
  | AddToFavorite
  | PhotosVisibilityFilter
  | RequestPhotoViewAction
  | ReceivedPhotoViewAction
  | ErrorRequestAction;
