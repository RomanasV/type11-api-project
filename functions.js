function renderListElement(data) {
  let itemElement = document.createElement('li');

  if (data.class) {
    itemElement.classList.add(data.class);
  }
  
  itemElement.innerHTML = `<a href="${data.href}">${data.content}</a>`;
  data.parentElement.append(itemElement);
}

function renderSingleComment() {
  
}