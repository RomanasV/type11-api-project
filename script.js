let postsWrapper = document.querySelector('#posts-wrapper');

fetch('https://jsonplaceholder.typicode.com/posts?_limit=15')
  .then(res => res.json())
  .then(posts => {
    posts.map(post => {

      fetch('https://jsonplaceholder.typicode.com/users/' + post.userId)
        .then(res => res.json())
        .then(user => {
          console.log(user.name);
        })

      let updatedTitle = post.title[0].toUpperCase() + post.title.slice(1);

      let postItem = document.createElement('div');
      postItem.classList.add('post-item');

      // postItem.innerHTML = `<h2 class="post-title">${post.title}</h2>
      //                       <span class="post-author">Author: ${post.userId}</span>
      //                       <p class="post-content">${post.body}</p>`;

      let postTitle = document.createElement('h2');
      postTitle.classList.add('post-title');
      postTitle.textContent = updatedTitle;

      let postAuthor = document.createElement('span');
      postAuthor.classList.add('post-author');
      postAuthor.innerHTML = `Author: <a href="#">${post.userId}</a>`;

      let postBody = document.createElement('p');
      postBody.classList.add('post-content');
      postBody.textContent = post.body;

      postItem.append(postTitle, postAuthor, postBody);
      postsWrapper.prepend(postItem);

    });
  })