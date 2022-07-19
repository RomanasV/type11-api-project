import { firstLetterUpperCase } from "./functions.js";

export default function albums(albumsData, wrapperSelector) {
  let albumsWrapper = document.querySelector(wrapperSelector);
  let albumsWrapperTitle = document.createElement('h2');

  albumsData.map(album => {
    let createdBy = '';

    let albumItem = document.createElement('div');
    albumItem.classList.add('album-item');
    
    document.body.prepend(albumsWrapperTitle);
  
    albumsWrapperTitle.textContent = `Albums of ${album.user.name}:`;
  
    let randomIndex = Math.floor(Math.random() * album.photos.length);
  
    albumItem.innerHTML = `<h3><a href="./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${album.user.name}">${firstLetterUpperCase(album.title)}</a> (${album.photos.length})</h3>
                          ${createdBy}
                          <img src="${album.photos[randomIndex].thumbnailUrl}">`;
    
    albumsWrapper.prepend(albumItem);
  })
}