fetch('https://jsonplaceholder.typicode.com/albums?_limit=15')
  .then(res => res.json())
  .then(albums => {
    let albumsWrapper = document.querySelector('#albums-wrapper');

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