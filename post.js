import { firstLetterUpperCase, renderSingleComment } from './functions.js';
import headerView from './headerView.js';

headerView();

let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let postId = urlParams.get('post_id');

fetch('https://jsonplaceholder.typicode.com/posts/' + postId)
  .then(res => res.json())
  .then(post => {
    let postWrapper = document.querySelector('#post-wrapper');

    let updatedTitle = firstLetterUpperCase(post.title);

    let postItem = document.createElement('div');
    postItem.classList.add('post-item');

    let postTitle = document.createElement('h2');
    postTitle.classList.add('post-title');
    postTitle.textContent = updatedTitle;

    let postAuthor = document.createElement('span');
    postAuthor.classList.add('post-author');

    let postEditLink = document.createElement('a');
    postEditLink.textContent = 'Edit post';
    postEditLink.href = './edit-post.html?post_id=' + postId;

    let postBody = document.createElement('p');
    postBody.classList.add('post-content');
    postBody.textContent = post.body;

    let otherPosts = document.createElement('a');
    otherPosts.textContent = 'Other posts';
    otherPosts.setAttribute('href', `./posts.html?user_id=${post.userId}`);

    let commentsWrapper = document.createElement('div');
    commentsWrapper.classList.add('comments-wrapper');

    postItem.append(postTitle, postAuthor, postEditLink, postBody, otherPosts, commentsWrapper);
    postWrapper.prepend(postItem);

    fetch('https://jsonplaceholder.typicode.com/users/' + post.userId)
      .then(res => res.json())
      .then(user => {
        postAuthor.innerHTML = `Author: <a href="./user.html?user_id=${user.id}">${user.name}</a>`;
      })
    
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
      .then(res => res.json())
      .then(comments => {
        comments.map(singleComment => {
          renderSingleComment(singleComment, commentsWrapper);
        })

        let commentsForm = document.querySelector('#comments-form');

        commentsForm.addEventListener('submit', async (event) => {
          event.preventDefault();

          let name = event.target.elements.name.value;
          let email = event.target.elements.email.value;
          let body = event.target.elements.body.value;

          let newComment = {
            name,
            email,
            body,
            postId: Number(postId),
          }

          let editCommentId = event.target.dataset.editCommentId;

          if (!editCommentId) {
            let res = await fetch('https://jsonplaceholder.typicode.com/comments', {
              method: 'POST',
              body: JSON.stringify(newComment),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            });

            let responseComment = await res.json();
            console.log(responseComment);
            renderSingleComment(responseComment, commentsWrapper);
          } else {
            let res = await fetch('https://jsonplaceholder.typicode.com/comments/' + editCommentId, {
              method: 'PATCH',
              body: JSON.stringify(newComment),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            });

            let responseComment = await res.json();
            console.log(responseComment);
            renderSingleComment(responseComment, commentsWrapper);
          }

          commentsForm.reset();
          commentsForm.elements['edit-button'].value = 'Add a comment';
          delete event.target.dataset.editCommentId;
        })
      })
  })