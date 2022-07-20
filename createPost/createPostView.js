import { getUserById } from "./createPostController.js";

export default async function createPost(createdPost, formElement) {
  let { body, title, id, userId } = createdPost;

  let createdPostWrapper = document.createElement('div');
  createdPostWrapper.classList.add('post-wrapper');

  let postTitleElement = document.createElement('h2');
  postTitleElement.innerHTML = `${title} <span>(id: ${id})</span>`;

  let postAuthor = await getUserById(userId);

  let postAuthorElement = document.createElement('span');
  postAuthorElement.innerHTML = `Post author: <a href="./user.html?user_id=${userId}">${postAuthor.name}</a>`

  let postContentElement = document.createElement('p');
  postContentElement.textContent = body;

  createdPostWrapper.append(postTitleElement, postAuthorElement, postContentElement);

  formElement.after(createdPostWrapper);
}