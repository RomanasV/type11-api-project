import { firstLetterUpperCase } from '../functions.js';

export default function album(data) {
  let {photos, albumTitle, userId, userName} = data;

  let albumWrapper = document.querySelector('#album-wrapper');
  
  if (photos.length > 0) {
    let albumTitleElement = document.createElement('h1');
    albumTitleElement.classList.add('album-title');
    albumTitleElement.textContent = firstLetterUpperCase(albumTitle);

    let albumAuthorElement = document.createElement('span');
    albumAuthorElement.classList.add('album-author');
    albumAuthorElement.innerHTML = `<strong>Album author:</strong> <a href="./user.html?user_id=${userId}">${userName}</a>`;

    let albumPhotos = document.createElement('div');
    albumPhotos.classList.add('album-photos');

    albumWrapper.append(albumTitleElement, albumAuthorElement, albumPhotos);

    photos.map(photo => {
      let imageElement = document.createElement('img');
      imageElement.src = photo.thumbnailUrl;
      imageElement.classList.add('album-image');
      imageElement.setAttribute('alt', photo.title);

      albumPhotos.prepend(imageElement);
    })
  } else {
    albumWrapper.innerHTML = `<h1>No albums :(</h1>
                              <p>Try <a href="./albums.html">here</a></p>`;
  }
}