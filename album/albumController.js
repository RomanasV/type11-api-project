async function getPhotosByAlbumId(albumId) {
  let res = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
  let photos = await res.json();
  return photos;
}

async function getExpandedAlbumById(id) {
  let res = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}?_expand=user&_embed=photos`);

  // return await res.json();

  let album = await res.json();
  return album;
}

export {
  getPhotosByAlbumId,
  getExpandedAlbumById,
}