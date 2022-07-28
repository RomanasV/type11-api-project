import headerView from '../headerView.js';
import { getAllExpandedAlbumsByUserId, getAllExpandedAlbums } from './albumsController.js';
import albums from './albumsView.js';

async function init() {
  headerView();

  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let userId = urlParams.get('user_id');
  let page = urlParams.get('page') ? urlParams.get('page') : 1;
  let limit = urlParams.get('limit') ? urlParams.get('limit') : 25;

  if (userId) {
    // let albumsData = await getAllExpandedAlbumsByUserId(userId);
    albums({
      albumsData: await getAllExpandedAlbumsByUserId(userId),
      wrapperSelector: '#albums-wrapper',
      allAlbums: false,
    });
    return;
  }

  let albumsData = await getAllExpandedAlbums(limit);
  albums({
    albumsData: albumsData.albums,
    wrapperSelector: '#albums-wrapper',
    allAlbums: true,
    total: albumsData.total,
    page,
    limit
  });
}

init();