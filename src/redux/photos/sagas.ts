import { takeEvery, put, fork, call } from "redux-saga/effects";
import {
  RequestPhotosFetchAction,
  AddToFavorite,
  RequestPhotoViewAction,
  PHOTOS_FETCH_REQUEST,
  PHOTO_VIEW_REQUEST,
  ADD_TO_FAVORITE
} from "./types";
import { receivedFetchPhotos, receivedViewPhoto, errorRequestPhoto } from "./actions";
import { get } from "../../services";
import { setFavorite } from "../../utils/common";

export function* fetchPhotos(action: RequestPhotosFetchAction) {
  const payload = action.payload;
  const limit = payload.pagination.pageSize;
  let offset = payload.pagination.page - 1;
  if (offset > 0) {
    offset = offset + limit;
  }
  const response = yield call(get, "/photos", { params: { _start: offset, _limit: limit } });
  if (response.success) {
    let pagination = { ...payload.pagination };
    pagination.total = parseInt(response.headers['x-total-count'], 10);
    yield put(receivedFetchPhotos(response.data, pagination));
  } else {
    yield put(errorRequestPhoto(response.error));
  }
}

export function* favoritePhotos(action: AddToFavorite) {
  yield call(setFavorite, action.payload.photo);
}

export function* viewPhoto(action: RequestPhotoViewAction) {
  const response = yield call(get, `/photos/${action.payload.id}`, {});
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
