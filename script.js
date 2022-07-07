let postsWrapper = document.querySelector('#posts-wrapper');
let albumsWrapper = document.querySelector('#albums-wrapper');

fetch('https://jsonplaceholder.typicode.com/posts?_limit=15')
  .then(res => res.json())
  .then(posts => {
    posts.map(post => {
      // fetch('https://jsonplaceholder.typicode.com/users/' + post.userId)
      //   .then(res => res.json())
      //   .then(user => {
      //     console.log(user.name);

      //     let updatedTitle = post.title[0].toUpperCase() + post.title.slice(1);

      //     let postItem = document.createElement('div');
      //     postItem.classList.add('post-item');
    
      //     // postItem.innerHTML = `<h2 class="post-title">${post.title}</h2>
      //     //                       <span class="post-author">Author: ${post.userId}</span>
      //     //                       <p class="post-content">${post.body}</p>`;
    
      //     let postTitle = document.createElement('h2');
      //     postTitle.classList.add('post-title');
      //     postTitle.textContent = updatedTitle;
    
      //     let postAuthor = document.createElement('span');
      //     postAuthor.classList.add('post-author');
      //     postAuthor.innerHTML = `Author: <a href="#">${user.name}</a>`;
    
      //     let postBody = document.createElement('p');
      //     postBody.classList.add('post-content');
      //     postBody.textContent = post.body;
    
      //     postItem.append(postTitle, postAuthor, postBody);
      //     postsWrapper.prepend(postItem);


      //   })
       
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

      let commentsWrapper = document.createElement('div');
      commentsWrapper.classList.add('comments-wrapper');

      postItem.append(postTitle, postAuthor, postBody, commentsWrapper);
      postsWrapper.prepend(postItem);

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
    });
  })

fetch('https://jsonplaceholder.typicode.com/albums?_limit=15')
  .then(res => res.json())
  .then(albums => {

    albums.map(album => {
      let albumItem = document.createElement('div');
      albumItem.classList.add('album-item');

      fetch('https://jsonplaceholder.typicode.com/users/' + album.userId)
        .then(res => res.json())
        .then(user => {

          fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos?_limit=1`)
            .then(res => res.json())
            .then(photos => {
              albumItem.innerHTML = `<h3><a href="./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${user.name}">${album.title}</a></h3>
                                     <div>Album created by: ${user.name}</div>
                                     <img src="${photos[0].thumbnailUrl}">`;
            })
        })

        albumsWrapper.prepend(albumItem);
    })


  })