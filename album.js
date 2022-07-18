import headerView from './headerView.js';
import album from './albumView.js';

headerView();

function init() {
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let albumId = urlParams.get('album_id');
  let albumTitle = urlParams.get('album_title');
  let userId = urlParams.get('user_id');
  let userName = urlParams.get('user_name');

  if (!albumId) {
    let albumWrapper = document.querySelector('#album-wrapper');
    albumWrapper.innerHTML = `<h1>No albums :)</h1>
                              <p>Try <a href="./albums.html">here</a></p>`;
    return;
  }

  if (albumTitle && userId && userName) {
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
      .then(res => res.json())
      .then(albumPhotos => {

        let dataObj = {
          photos: albumPhotos, 
          albumTitle, 
          userId, 
          userName,
        }

        album(dataObj);
      });
    return;
  }

  fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}?_expand=user&_embed=photos`)
    .then(res => res.json())
    .then(albumData => {
      let {photos, title, user} = albumData;

      let dataObj = {
        photos: photos, 
        albumTitle: title, 
        userId: user.id, 
        userName: user.name,
      }

      album(dataObj);
    })
}

init();