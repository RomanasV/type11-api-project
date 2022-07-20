import headerView from './headerView.js';

async function init() {
  headerView();

  let res = await fetch('https://jsonplaceholder.typicode.com/users');
  let data = await res.json();
  

  let selectElement = document.querySelector('#post-author');

  data.map(item => {
    let optionElement = document.createElement('option');
    optionElement.textContent = item.name;
    optionElement.value = item.id;

    selectElement.append(optionElement);
  })

  let createPostForm = document.querySelector('#create-post-form');

  createPostForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let title = event.target.elements.title.value;
    let content = event.target.elements.content.value;
    let author = event.target.elements.author.value;

    let newPost = {
      title,
      body: content,
      userId: author,
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(createdPost => {
        let { body, title, id, userId } = createdPost;
        console.log(createdPost);

        let createdPostWrapper = document.createElement('div');
        createdPostWrapper.classList.add('post-wrapper');

        let postTitle = document.createElement('h2');
        postTitle.innerHTML = `${title} <span>(id: ${id})</span>`;

        let postAuthor = document.createElement('span');
        postAuthor.innerHTML = `Post author: <a href="./user.html?user_id=${userId}">${userId}</a>`

        let postContent = document.createElement('p');
        postContent.textContent = body;

        createdPostWrapper.append(postTitle, postAuthor, postContent);

        event.target.after(createdPostWrapper);
      });

    event.target.reset();
  })
}

init();