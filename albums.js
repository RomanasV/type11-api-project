import headerView from './headerView.js';
import { getAllExpandedAlbumsByUserId, getAllExpandedAlbums } from './albumsController.js';
import albums from './albumsView.js';

async function init() {
  headerView();
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let userId = urlParams.get('user_id');

  if (userId) {
    let albumsData = await getAllExpandedAlbumsByUserId(userId);
    albums(albumsData, '#albums-wrapper', title, createdBy);
    return;
  }
  
  let albumsData = await getAllExpandedAlbums(15);

  albumsData.map(singleAlbum => {
    albums({
      album: singleAlbum,
      title: 'All albums:',
      createdBy: `<div>Album created by: <a href="./user.html?user_id=${singleAlbum.user.id}">${singleAlbum.user.name}</a></div>`,
    });
  })
}

init();