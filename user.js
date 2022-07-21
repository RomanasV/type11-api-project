import { firstLetterUpperCase, renderListElement } from './functions.js';
import headerView from './headerView.js';

headerView();

let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get('user_id');

fetch('https://jsonplaceholder.typicode.com/users/' + userId)
  .then(res => res.json())
  .then(user => {
    let userInfo = document.querySelector('#user-info');
    
    userInfo.innerHTML = `<h2>${user.name} (${user.username})</h2>
                          <ul>
                            <li><strong>Email:</strong> <a href="mailto:${user.email}">${user.email}</a></li>
                            <li><strong>Phone:</strong> <a href="tel:${user.phone}">${user.phone}</a></li>
                            <li><strong>Address:</strong> <a href="#">${user.address.street} ${user.address.suite}, ${user.address.city} (zipcode: ${user.address.zipcode})</a></li>
                            <li><strong>Website:</strong> <a href="${user.website}" target="_blank">${user.website}</a></li>
                            <li><strong>Work:</strong> ${user.company.name}</li>
                          </ul>`;
  })

fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
  .then(res => res.json())
  .then(posts => {
    let postsWrapper = document.querySelector('#posts-wrapper');

    let postsTitle = document.createElement('h3');
    postsTitle.classList.add('posts-title');
    postsTitle.textContent = 'User posts:';

    postsWrapper.append(postsTitle)

    posts.map(post => {
      let postItem = document.createElement('div');
      postItem.classList.add('post-item');

      postItem.innerHTML = `<h4>${firstLetterUpperCase(post.title)}</h4>
                            <p>${post.body}</p>
                            <a href="./post.html?post_id=${post.id}">Read More</a>`;

      postsWrapper.append(postItem);
    })
  })

fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
  .then(res => res.json())
  .then(albums => {
    let userAlbums = document.querySelector('#user-albums');

    userAlbums.innerHTML = '<h3 class="user-albums-title">User albums:</h3>';

    let albumsList = document.createElement('ul');
    albumsList.classList.add('albums-list');

    userAlbums.append(albumsList);

    albums.map(album => {
      renderListElement({
        href: `./album.html?album_id=${album.id}`,
        content: album.title,
        parentElement: albumsList,
        class: 'album-item',
      });
    })
  })