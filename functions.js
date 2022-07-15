function renderListElement(data) {
  let itemElement = document.createElement('li');

  if (data.class) {
    itemElement.classList.add(data.class);
  }
  
  itemElement.innerHTML = `<a href="${data.href}">${data.content}</a>`;
  data.parentElement.append(itemElement);
}

function renderSingleComment(comment, commentsWrapper) {
  let commentItem = document.createElement('div');
  commentItem.classList.add('comment-item');

  commentItem.innerHTML = `<h5>${firstLetterUpperCase(comment.name)}</h5>
                           <span>Comment by: ${comment.email}</span>
                           <p>${comment.body}</p>`

  commentsWrapper.prepend(commentItem);
}

function firstLetterUpperCase(str) {
  return str[0].toUpperCase() + str.slice(1);
}