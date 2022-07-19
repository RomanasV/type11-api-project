async function getAllExpandedAlbumsByUserId(id) {
  let res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums?_embed=photos&_expand=user`);
  let albums = await res.json();
  return albums;
}

async function getAllExpandedAlbums(limit) {
  let res = await fetch('https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos&_limit=' + limit);
  let albums = await res.json();
  return albums;
}

export {
  getAllExpandedAlbumsByUserId,
  getAllExpandedAlbums,
}