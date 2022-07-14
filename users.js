function usersPageInit() {

  fetch('https://jsonplaceholder.typicode.com/users?_embed=posts')
    .then(res => res.json())
    .then(users => {
      let usersWrapper = document.querySelector('#users-wrapper');
      let usersList = document.createElement('ul');

      usersWrapper.append(usersList);

      users.map(user => {
        renderListElement({
          content: `${user.name} (${user.posts.length} posts)`,
          href: `./user.html?user_id=${user.id}`,
          parentElement: usersList,
          class: 'user-item',
        });
      })
    })
}

usersPageInit();