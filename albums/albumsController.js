async function getAllExpandedAlbumsByUserId(id) {
  let res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums?_embed=photos&_expand=user`);
  let albums = await res.json();
  return albums;
}

async function getAllExpandedAlbums(limit, page) {
  let res = await fetch(`https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos&_page=${page}&_limit=${limit}`);
  let albums = await res.json();
  let total = res.headers.get('X-Total-Count');
  let data = {albums, total};

  return data;
}

export {
  getAllExpandedAlbumsByUserId,
  getAllExpandedAlbums,
}