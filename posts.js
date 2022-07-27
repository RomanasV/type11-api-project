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
  let urlParams = document.location.search;
  let searchParams = new URLSearchParams(urlParams);
  let limit = searchParams.get('limit') ? searchParams.get('limit') : 5;
  let page = searchParams.get('page') ? searchParams.get('page') : 1;

  fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts?_limit=5&_page=1&_expand=user`)
    .then(res => res.json())
    .then(posts => {
      postsListTitle.textContent = `Posts of ${posts[0].user.name}:`;
      
      renderPaginationLinks({limit, page});

      posts.map(post => {
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
  let total = 10;
  let currentPage = Number(data.page);
  let limit = data.limit;
  let pages = Math.ceil(total / limit);

  if (pages === 1) {
    return;
  }

  let paginationWrapper = document.createElement('div');
  paginationWrapper.classList.add('pagination-wrapper');

  if (currentPage !== 1) {
    let firstPaginationPageItem = document.createElement('a');
    firstPaginationPageItem.href = `./posts.html?page=1&limit=${limit}`;
    firstPaginationPageItem.textContent = 'First';
    
    let prevPaginationPageItem = document.createElement('a');
    prevPaginationPageItem.href = `./posts.html?page=${currentPage - 1}&limit=${limit}`
    prevPaginationPageItem.textContent = 'Prev';
  
    paginationWrapper.append(firstPaginationPageItem, prevPaginationPageItem);
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

    let nextPaginationPageItem = document.createElement('a');
    nextPaginationPageItem.href = `./posts.html?page=${currentPage + 1}&limit=${limit}`;
    nextPaginationPageItem.textContent = 'Next';

    paginationWrapper.append(nextPaginationPageItem, lastPaginationPageItem);
  }

  postsWrapper.append(paginationWrapper);
}

init();