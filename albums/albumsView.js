import { firstLetterUpperCase } from "../functions.js";

export default function albums(data) {
  let { albumsData, wrapperSelector, allAlbums } = data;

  let albumsWrapper = document.querySelector(wrapperSelector);
  let albumsWrapperTitle = document.createElement('h2');
  albumsWrapper.before(albumsWrapperTitle);

  if (allAlbums) {
    albumsWrapperTitle.textContent = `All albums:`;
  } else {
    albumsWrapperTitle.textContent = `Albums of ${albumsData[0].user.name}:`;
  }

  albumsData.map(album => {
    let createdBy = '';

    if (allAlbums) {
      createdBy = `<div>Album created by: <a href="./user.html?user_id=${album.user.id}">${album.user.name}</a></div>`;
    }

    let albumItem = document.createElement('div');
    albumItem.classList.add('album-item');
  
    let randomIndex = Math.floor(Math.random() * album.photos.length);
  
    albumItem.innerHTML = `<h3><a href="./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${album.user.name}">${firstLetterUpperCase(album.title)}</a> (${album.photos.length})</h3>
                          ${createdBy}
                          <img src="${album.photos[randomIndex].thumbnailUrl}">`;
    
    albumsWrapper.prepend(albumItem);
  })
}