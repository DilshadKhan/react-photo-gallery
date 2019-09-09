import { all } from "redux-saga/effects";
import photoSagas from "./photos/sagas";

export default function* root() {
    yield all([
        photoSagas(),
    ]);
}
