function init() {
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let albumId = urlParams.get('album_id');
  let albumTitle = urlParams.get('album_title');
  let userId = urlParams.get('user_id');
  let userName = urlParams.get('user_name');

  if (albumId) {

    if (albumTitle && userId && userName) {
      fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
        .then(res => res.json())
        .then(albumPhotos => {

          // let dataObj = {
          //   photos: albumPhotos, 
          //   albumTitle: albumTitle, 
          //   userId: userId, 
          //   userName: userName,
          // }

          let dataObj = {
            photos: albumPhotos, 
            albumTitle, 
            userId, 
            userName,
          }

          renderAlbumsPage(dataObj);
      })
    } else {
      fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}?_expand=user&_embed=photos`)
        .then(res => res.json())
        .then(album => {
          // let dataObj = {
          //   photos: album.photos, 
          //   albumTitle: album.title, 
          //   userId: album.user.id, 
          //   userName: album.user.name,
          // }

          let {photos, title, user} = album;

          let dataObj = {
            photos: photos, 
            albumTitle: title, 
            userId: user.id, 
            userName: user.name,
          }

          renderAlbumsPage(dataObj);
        })
    }  

  } else {
    let albumWrapper = document.querySelector('#album-wrapper');
    albumWrapper.innerHTML = `<h1>No albums :)</h1>
                              <p>Try <a href="./albums.html">here</a></p>`;
  }

}

function renderAlbumsPage(data) {
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

init();