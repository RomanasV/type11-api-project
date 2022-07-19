import headerView from '../headerView.js';
import album from './albumView.js';
import { getPhotosByAlbumId, getExpandedAlbumById } from './albumController.js';

async function init() {
  headerView();
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
    // album({
    //   photos: await getPhotosByAlbumId(albumId), 
    //   albumTitle, 
    //   userId, 
    //   userName,
    // });

    let albumPhotos = await getPhotosByAlbumId(albumId);

    let dataObj = {
      photos: albumPhotos, 
      albumTitle, 
      userId, 
      userName,
    }

    album(dataObj);
    return;
  }

  let albumData = await getExpandedAlbumById(albumId);
  let {photos, title, user} = albumData;

  let dataObj = {
    photos: photos, 
    albumTitle: title, 
    userId: user.id, 
    userName: user.name,
  }

  album(dataObj);
}

init();