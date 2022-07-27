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
      renderPaginationLinks({limit, page});

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

function renderPaginationLinks(data) {
  let total = 100;
  let currentPage = Number(data.page);
  let limit = data.limit;
  let pages = Math.ceil(total / limit);

  let paginationWrapper = document.createElement('div');
  paginationWrapper.classList.add('pagination-wrapper');

  if (currentPage !== 1) {
    let firstPaginationPageItem = document.createElement('a');
    firstPaginationPageItem.href = `./posts.html?page=1&limit=${limit}`;
    firstPaginationPageItem.textContent = 'First';
    
    paginationWrapper.append(firstPaginationPageItem);
  }

  for (let i = 1; i <= pages; i++) {
    let paginationListItem;

    if (i === currentPage) {
      paginationListItem = document.createElement('span');
      paginationListItem.classList.add('current-page');
    } else {
      paginationListItem = document.createElement('a');
      paginationListItem.href = `./posts.html?page=${i}&limit=${limit}`;
    }

    paginationListItem.classList.add('pagination-item');
    paginationListItem.textContent = i;
    paginationWrapper.append(paginationListItem);
  }

  if (currentPage !== pages) {
    let lastPaginationPageItem = document.createElement('a');
    lastPaginationPageItem.href = `./posts.html?page=${pages}&limit=${limit}`;
    lastPaginationPageItem.textContent = 'Last';
    
    paginationWrapper.append(lastPaginationPageItem);
  }

  postsWrapper.append(paginationWrapper);
}

init();