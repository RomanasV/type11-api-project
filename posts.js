import { renderListElement } from './functions.js';
import headerView from './headerView.js';

headerView();

let postsWrapper = document.querySelector('#posts-wrapper');
let postsListTitle = document.createElement('h2');
let postsList = document.createElement('ul');

postsWrapper.append(postsListTitle, postsList);

function init () { 
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let userId = urlParams.get('user_id');

  if (userId) {
    renderPostsByUserId(userId);
  } else {
    renderAllPosts();
  }
}

function renderPostsByUserId(id) {

  fetch(`https://jsonplaceholder.typicode.com/users/${id}?_embed=posts`)
    .then(res => res.json())
    .then(user => {
      postsListTitle.textContent = `Posts of ${user.name}:`;
      
      user.posts.map(post => {
        renderListElement({
          content: post.title,
          href: `./post.html?post_id=${post.id}`,
          parentElement: postsList,
          class: 'post-item',
        });
      })
    })
}

function renderAllPosts() {
  fetch('https://jsonplaceholder.typicode.com/posts?_expand=user')
    .then(res => res.json())
    .then(posts => {
      postsListTitle.textContent = 'All Posts:';
      posts.map(post => {
        renderListElement({
          content: `${post.title} (${post.user.name})`,
          href: `./post.html?post_id=${post.id}`,
          parentElement: postsList,
          class: 'post-item',
        });
      })
    })
}

init();