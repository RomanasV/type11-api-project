fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(users => {
    let usersWrapper = document.querySelector('#users-wrapper');
    let usersList = document.createElement('ul');

    usersWrapper.append(usersList);

    users.map(user => {
      fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
        .then(res => res.json())
        .then(posts => {
          let userElement = document.createElement('li');
          userElement.innerHTML = `<a href="./user.html?user_id=${user.id}">${user.name} (${posts.length} posts)</a>`;
          usersList.prepend(userElement);
        })

    })
  })