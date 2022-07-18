import { renderListElement } from '../functions.js';

function usersList(users) {
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
}

export default usersList;