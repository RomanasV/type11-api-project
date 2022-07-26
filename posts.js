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
  let urlParams = document.location.search;
  let searchParams = new URLSearchParams(urlParams);
  let limit = searchParams.get('limit') ? searchParams.get('limit') : 25;
  let page = searchParams.get('page') ? searchParams.get('page') : 1;

  fetch(`https://jsonplaceholder.typicode.com/posts?_expand=user&_page=${page}&_limit=${limit}`)
    .then(res => res.json())
    .then(posts => {
      renderPaginationLinks(limit);

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

function renderPaginationLinks(pageLimit) {
  let total = 100;
  let limit = pageLimit;
  let pages = Math.ceil(total / limit);

  let paginationWrapper = document.createElement('div');
  paginationWrapper.classList.add('pagination-wrapper');

  for (let i = 1; i <= pages; i++) {
    let paginationLink = document.createElement('a');
    paginationLink.href = `./posts.html?page=${i}&limit=${limit}`;
    paginationLink.textContent = i;
    paginationWrapper.append(paginationLink);
  }

  postsWrapper.append(paginationWrapper);
}

init();