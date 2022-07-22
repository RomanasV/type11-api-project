import { getAllUsers } from '../createPost/createPostController.js';
import { renderOptionElement } from '../functions.js';

async function init() {
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let postId = urlParams.get('post_id');
  
  let res = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId);
  let post = await res.json();

  let users = await getAllUsers();
  let selectElement = document.querySelector('#post-author');

  users.map(item => {
    renderOptionElement({
      content: item.name,
      value: item.id,
      parentElement: selectElement,
    });
  })

  const editPostForm = document.querySelector('#edit-post-form');
  let postTitle = editPostForm.elements.title;
  let postContent = editPostForm.elements.content;
  let postAuthor = editPostForm.elements.author;

  postTitle.value = post.title;
  postContent.value = post.body;
  postAuthor.value = post.userId;
}

init();