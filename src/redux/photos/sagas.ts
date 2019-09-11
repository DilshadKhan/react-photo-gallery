import { takeEvery, put, fork, call } from 'redux-saga/effects';
import {
  RequestPhotosFetchAction,
  AddToFavorite,
  RequestPhotoViewAction,
  PHOTOS_FETCH_REQUEST,
  PHOTO_VIEW_REQUEST,
  ADD_TO_FAVORITE
} from './types';
import {
  receivedFetchPhotos,
  receivedViewPhoto,
  errorRequestPhoto
} from './actions';
import services from '../../services';
import { setFavorite } from '../../utils/common';

export function* fetchPhotos(action: RequestPhotosFetchAction) {
  const response = yield call(services.get, '/photos', {});
  if (response.success) {
    yield put(receivedFetchPhotos(response.data));
  } else {
    yield put(errorRequestPhoto(response.error));
  }
}

export function* favoritePhotos(action: AddToFavorite) {
  yield call(setFavorite, action.payload.id, action.payload.albumId);
}

export function* viewPhoto(action: RequestPhotoViewAction) {
  const response = yield call(services.get, `/photos/${action.payload.id}`, {});
  if (response.success) {
    yield put(receivedViewPhoto(response.data));
  } else {
    yield put(errorRequestPhoto(response.error));
  }
}

export function* watchRequests() {
  yield takeEvery(PHOTOS_FETCH_REQUEST, fetchPhotos);
  yield takeEvery(ADD_TO_FAVORITE, favoritePhotos);
  yield takeEvery(PHOTO_VIEW_REQUEST, viewPhoto);
}

export default function* root() {
  yield fork(watchRequests);
}
