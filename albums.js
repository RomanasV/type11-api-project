let albumsWrapper = document.querySelector('#albums-wrapper');
let albumsWrapperTitle = document.createElement('h2');
document.body.prepend(albumsWrapperTitle);

function init() {
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let userId = urlParams.get('user_id');

  if (userId) {
    renderAlbumsByUserId(userId);
  } else {
    renderAllAlbums();
  }
}

function renderAlbumsByUserId(id) {
  fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums?_embed=photos&_expand=user`)
    .then(res => res.json())
    .then(albums => {
      albums.map(singleAlbum => {
        // let albumItem = document.createElement('div');
        // albumItem.classList.add('album-item');
        
        // albumsWrapperTitle.textContent = `Albums of ${album.user.name}:`;
            
        // let randomIndex = Math.floor(Math.random() * album.photos.length);

        // albumItem.innerHTML = `<h3><a href="./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${album.user.name}">${album.title}</a> (${album.photos.length})</h3>
        // <img src="${album.photos[randomIndex].thumbnailUrl}">`;

        // albumsWrapper.prepend(albumItem);

        let albumData = {
          album: singleAlbum,
          title: `Albums of ${singleAlbum.user.name}:`,
          createdBy: '',
        }

        renderSingleAlbum(albumData);
      })
    })
}

function renderAllAlbums() {
  fetch('https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos&_limit=15')
    .then(res => res.json())
    .then(albums => {
      console.log(albums);
      albums.map(singleAlbum => {

        // let albumData = {
        //   album: singleAlbum,
        //   title: 'All albums:',
        //   createdBy: `<div>Album created by: <a href="./user.html?user_id=${singleAlbum.user.id}">${singleAlbum.user.name}</a></div>`,
        // }

        // renderSingleAlbum(albumData);

        renderSingleAlbum({
          album: singleAlbum,
          title: 'All albums:',
          createdBy: `<div>Album created by: <a href="./user.html?user_id=${singleAlbum.user.id}">${singleAlbum.user.name}</a></div>`,
        });
      })
    })
}

function renderSingleAlbum(data) {
  // let album = data.album;
  // let title = data.title;
  // let createdBy = data.createdBy;
  
  let {album, title, createdBy} = data;

  let albumItem = document.createElement('div');
  albumItem.classList.add('album-item');
  
  albumsWrapperTitle.textContent = title;

  let randomIndex = Math.floor(Math.random() * album.photos.length);

  albumItem.innerHTML = `<h3><a href="./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${album.user.name}">${firstLetterUpperCase(album.title)}</a> (${album.photos.length})</h3>
                        ${createdBy}
                        <img src="${album.photos[randomIndex].thumbnailUrl}">`;

  albumsWrapper.prepend(albumItem);
}

init();