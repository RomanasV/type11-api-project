let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let albumId = urlParams.get('album_id');
let albumTitle = urlParams.get('album_title');
let userId = urlParams.get('user_id');
let userName = urlParams.get('user_name');

console.log(albumId);
console.log(albumTitle);
console.log(userId);
console.log(userName);

// fetch('https://jsonplaceholder.typicode.com/albums/' + albumId)
//   .then(res => res.json())
//   .then(album => {
//     console.log(album);
//   })

// fetch('https://jsonplaceholder.typicode.com/users/' + userId)
//   .then(res => res.json())
//   .then(user => {
//     console.log(user.name);
//   })

fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
  .then(res => res.json())
  .then(photos => {
    let albumWrapper = document.querySelector('#album-wrapper');

    if (photos.length > 0) {
      let albumTitleElement = document.createElement('h1');
      albumTitleElement.classList.add('album-title');
      albumTitleElement.textContent = albumTitle;

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
  })