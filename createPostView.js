export default function createPost(createdPost, formElement) {
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

  formElement.after(createdPostWrapper);
}