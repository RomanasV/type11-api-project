export function renderListElement(data) {
  let itemElement = document.createElement('li');

  if (data.class) {
    itemElement.classList.add(data.class);
  }
  
  itemElement.innerHTML = `<a href="${data.href}">${firstLetterUpperCase(data.content)}</a>`;
  data.parentElement.append(itemElement);
}

export function renderOptionElement(data) {
  let optionElement = document.createElement('option');
  optionElement.textContent = data.content;
  optionElement.value = data.value;

  data.parentElement.append(optionElement);
}

export function renderSingleComment(comment, commentsWrapper) {
  let commentItem = document.createElement('div');
  commentItem.classList.add('comment-item');

  commentItem.innerHTML = `<h5 class="comment-title">${firstLetterUpperCase(comment.name)}</h5>
                           <span>Comment by: <span class="comment-email">${comment.email}</span></span>
                           <p class="comment-body">${comment.body}</p>`;

  let editButton = document.createElement('button');
  editButton.textContent = 'Edit';

  editButton.addEventListener('click', () => {
    let commentForm = document.querySelector('#comments-form');
    // let commentTitle = editButton.parentElement.querySelector('.comment-title').textContent;
    // let commentBody = editButton.parentElement.querySelector('.comment-body').textContent;
    // let commentEmail = editButton.parentElement.querySelector('.comment-email').textContent;

    let commentTitle = comment.name;
    let commentBody = comment.body;
    let commentEmail = comment.email;

    commentForm.elements.name.value = commentTitle;
    commentForm.elements.body.value = commentBody;
    commentForm.elements.email.value = commentEmail;
    commentForm.elements['edit-button'].value = 'Edit a comment';

    commentForm.dataset.editCommentId = comment.id;

  })

  commentItem.append(editButton);

  commentsWrapper.prepend(commentItem);
}

export function firstLetterUpperCase(str) {
  return str[0].toUpperCase() + str.slice(1);
}