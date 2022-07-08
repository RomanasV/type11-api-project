let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get('user_id');

console.log(userId);

let albumsWrapper = document.querySelector('#albums-wrapper');
let albumsWrapperTitle = document.createElement('h2');
document.body.prepend(albumsWrapperTitle);

if (userId) {
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
    .then(res => res.json())
    .then(albums => {
      albums.map(album => {
        let albumItem = document.createElement('div');
        albumItem.classList.add('album-item');

        fetch('https://jsonplaceholder.typicode.com/users/' + album.userId)
          .then(res => res.json())
          .then(user => {
            albumsWrapperTitle.textContent = `Albums of ${user.name}:`;

            fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`)
              .then(res => res.json())
              .then(photos => {
                let randomIndex = Math.floor(Math.random() * photos.length);

                albumItem.innerHTML = `<h3><a href="./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${user.name}">${album.title}</a> (${photos.length})</h3>
                <img src="${photos[randomIndex].thumbnailUrl}">`;
              })
          })

          albumsWrapper.prepend(albumItem);
      })
    })
} else {
  fetch('https://jsonplaceholder.typicode.com/albums?_limit=15')
    .then(res => res.json())
    .then(albums => {
      albumsWrapperTitle.textContent = 'All albums:';
      albums.map(album => {
        let albumItem = document.createElement('div');
        albumItem.classList.add('album-item');

        fetch('https://jsonplaceholder.typicode.com/users/' + album.userId)
          .then(res => res.json())
          .then(user => {

            fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`)
              .then(res => res.json())
              .then(photos => {
                let randomIndex = Math.floor(Math.random() * photos.length);

                albumItem.innerHTML = `<h3><a href="./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${user.name}">${album.title}</a> (${photos.length})</h3>
                                      <div>Album created by: <a href="./user.html?user_id=${user.id}">${user.name}</a></div>
                                      <img src="${photos[randomIndex].thumbnailUrl}">`;
              })
          })

          albumsWrapper.prepend(albumItem);
      })
    })
}
