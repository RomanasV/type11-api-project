let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let postId = urlParams.get('post_id');

fetch('https://jsonplaceholder.typicode.com/posts/' + postId)
  .then(res => res.json())
  .then(post => {
    let postWrapper = document.querySelector('#post-wrapper');

    let updatedTitle = post.title[0].toUpperCase() + post.title.slice(1);

    let postItem = document.createElement('div');
    postItem.classList.add('post-item');

    let postTitle = document.createElement('h2');
    postTitle.classList.add('post-title');
    postTitle.textContent = updatedTitle;

    let postAuthor = document.createElement('span');
    postAuthor.classList.add('post-author');

    let postBody = document.createElement('p');
    postBody.classList.add('post-content');
    postBody.textContent = post.body;

    let otherPosts = document.createElement('a');
    otherPosts.textContent = 'Other posts';
    otherPosts.setAttribute('href', `./posts.html?user_id=${post.userId}`);

    let commentsWrapper = document.createElement('div');
    commentsWrapper.classList.add('comments-wrapper');

    postItem.append(postTitle, postAuthor, postBody, otherPosts, commentsWrapper);
    postWrapper.prepend(postItem);

    fetch('https://jsonplaceholder.typicode.com/users/' + post.userId)
      .then(res => res.json())
      .then(user => {
        postAuthor.innerHTML = `Author: <a href="./user.html?user_id=${user.id}">${user.name}</a>`;
      })
    
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
      .then(res => res.json())
      .then(comments => {
        comments.map(comment => {
          let commentItem = document.createElement('div');
          commentItem.classList.add('comment-item');

          commentItem.innerHTML = `<h3>${comment.name}</h3>
                                    <span>Comment by: ${comment.email}</span>
                                    <p>${comment.body}</p>`

          commentsWrapper.prepend(commentItem);              
        })
      })
  })