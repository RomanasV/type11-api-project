function usersPageInit() {

  fetch('https://jsonplaceholder.typicode.com/users?_embed=posts')
    .then(res => res.json())
    .then(users => {
      let usersWrapper = document.querySelector('#users-wrapper');
      let usersList = document.createElement('ul');

      usersWrapper.append(usersList);

      users.map(user => {
        let userElement = document.createElement('li');
        userElement.innerHTML = `<a href="./user.html?user_id=${user.id}">${user.name} (${user.posts.length} posts)</a>`;
        usersList.prepend(userElement);
      })
    })
}

usersPageInit();