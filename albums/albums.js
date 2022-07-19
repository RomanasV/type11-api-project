import headerView from '../headerView.js';
import { getAllExpandedAlbumsByUserId, getAllExpandedAlbums } from './albumsController.js';
import albums from './albumsView.js';

async function init() {
  headerView();

  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let userId = urlParams.get('user_id');

  if (userId) {
    // let albumsData = await getAllExpandedAlbumsByUserId(userId);
    albums({
      albumsData: await getAllExpandedAlbumsByUserId(userId),
      wrapperSelector: '#albums-wrapper',
      allAlbums: false,
    });
    return;
  }
  
  // let albumsData = await getAllExpandedAlbums(15);
  albums({
    albumsData: await getAllExpandedAlbums(15),
    wrapperSelector: '#albums-wrapper',
    allAlbums: true,
  });
}

init();