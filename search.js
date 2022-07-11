let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let searchPhrase = urlParams.get('search-input');

let searchResults = document.querySelector('#search-results');
let usersList = document.createElement('ul');

searchResults.append(usersList);

fetch(`https://jsonplaceholder.typicode.com/users?username=${searchPhrase}`)
  .then(res => res.json())
  .then(users => {
    if (users.length > 0) {
      users.map(user => {
        let userItem = document.createElement('li');
        userItem.innerHTML = `<a href="./user.html?user_id=${user.id}">${user.name}</a>`;

        usersList.append(userItem);
      })
    } else {
      fetch(`https://jsonplaceholder.typicode.com/users?name=${searchPhrase}`)
        .then(res => res.json())
        .then(usersByName => {
          console.log(usersByName);
        })
    }
  })