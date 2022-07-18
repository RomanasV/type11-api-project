import headerView from './headerView.js';
import usersList from './usersListView.js';

headerView();

function usersPageInit() {

  fetch('https://jsonplaceholder.typicode.com/users?_embed=posts')
    .then(res => res.json())
    .then(usersData => {
      usersList(usersData);
    })
}

usersPageInit();