import { Favorites } from "../redux/photos/types";

export function setFavorite(id: number, albumId: number) {
  let favoritePhotos = JSON.parse(localStorage.getItem("favorite-photos") || "[]");
  let found = favoritePhotos.findIndex(
    (item: Favorites) => item.id === id && item.albumId === albumId
  );
  if (found === -1) {
    favoritePhotos.push({ id, albumId });
  } else {
    favoritePhotos.splice(found, 1);
  }
  localStorage.setItem("favorite-photos", JSON.stringify(favoritePhotos));
  return true;
}
