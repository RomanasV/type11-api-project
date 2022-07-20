import headerView from '../headerView.js';
import { getAllUsers, createNewPost } from './createPostController.js';
import { renderOptionElement } from '../functions.js';
import createPost from './createPostView.js';

async function init() {
  headerView();

  let users = await getAllUsers();

  let selectElement = document.querySelector('#post-author');

  users.map(item => {
    renderOptionElement({
      content: item.name,
      value: item.id,
      parentElement: selectElement,
    });
  })

  let createPostForm = document.querySelector('#create-post-form');

  createPostForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // let createdPost = await createNewPost({
    //   title: event.target.elements.title.value,
    //   body: event.target.elements.content.value,
    //   userId: event.target.elements.author.value,
    // });

    let newPostTitle = event.target.elements.title.value;
    let newPostContent = event.target.elements.content.value;
    let newPostAuthor = event.target.elements.author.value;

    let newPost = {
      title: newPostTitle,
      body: newPostContent,
      userId: newPostAuthor,
    };

    let createdPost = await createNewPost(newPost);

    createPost(createdPost, event.target);

    event.target.reset();
  })
}

init();