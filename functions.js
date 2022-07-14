function renderListElement(data) {
  let itemElement = document.createElement('li');
  itemElement.classList.add('search-item');
  itemElement.innerHTML = `<a href="${data.href}">${data.content}</a>`;
  data.parentElement.append(itemElement);
}