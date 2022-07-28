import { renderListElement } from './functions.js';
import headerView from './headerView.js';
import renderPaginationLinks from './pagination.js'; 

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
  let total;

  fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts?_limit=${limit}&_page=${page}&_expand=user`)
    .then(res => {
      total = res.headers.get('x-total-count');
      return res.json();
    })
    .then(posts => {
      postsListTitle.textContent = `Posts of ${posts[0].user.name}:`;
      
      renderPaginationLinks({
        limit, 
        page, 
        total, 
        param: `user_id=${id}`,
        parentElement: postsWrapper,
      });

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
  let total;

  fetch(`https://jsonplaceholder.typicode.com/posts?_expand=user&_page=${page}&_limit=${limit}`)
    .then(res => {
      total = res.headers.get('x-total-count');
      return res.json();
    })
    .then(posts => {
      renderPaginationLinks({
        limit,
        page,
        total,
        parentElement: postsWrapper,
      });

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





















// document.querySelector('select').addEventListener('change', (event) => {
//   console.log(event.target.value);
//   let search = document.location.search;
//   let params = new URLSearchParams(search);
//   params.set('limit', event.target.value);
// console.log(params.toString());

// console.log(document.location);
//   window.location.href = './posts.html?' + params.toString();
// })