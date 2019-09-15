import { Photo } from "../redux/photos/types";

export function setFavorite(photo: Photo) {
  let favorites = JSON.parse(localStorage.getItem("favorite-photos") || "[]");
  let found = favorites.findIndex(
    (item: Photo) => item.id === photo.id && item.albumId === photo.albumId
  );
  if (found === -1) {
    favorites.push({ ...photo, favorite: true });
  } else {
    favorites.splice(found, 1);
  }
  localStorage.setItem("favorite-photos", JSON.stringify(favorites));
  return true;
}
