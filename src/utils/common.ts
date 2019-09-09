export function setFavorite(id: number, albumId: number) {
  let favoritePhotos = JSON.parse(
    localStorage.getItem('favorite-photos') || '[]'
  );
  let found = favoritePhotos.find(
    (item: any) => item.id === id && item.albumId === albumId
  );
  if (!found) {
    favoritePhotos.push({ id, albumId });
    localStorage.setItem('favorite-photos', JSON.stringify(favoritePhotos));
    return true;
  }
  return false;
}
