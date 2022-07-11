let navigationItems = [
  {
    title: 'Home',
    path: 'index.html',
  },
  {
    title: 'Users',
    path: 'users.html',
  },
  {
    title: 'Albums',
    path: 'albums.html',
  },
  {
    title: 'Posts',
    path: 'posts.html',
  }
];

let pathname = document.location.pathname;

let header = document.createElement('header');
let nav = document.createElement('nav');
let searchForm = document.createElement('form');
searchForm.setAttribute('action', './search.html');

let navList = document.createElement('ul');

navigationItems.map(navItem => {
  let navItemElement = document.createElement('li');
  let navItemLink = document.createElement('a');
  navItemLink.textContent = navItem.title;
  navItemLink.setAttribute('href', `./${navItem.path}`);

  if (pathname.includes(navItem.path)) {
    navItemLink.classList.add('active');
  }

  navItemElement.append(navItemLink);
  navList.append(navItemElement);
})

let searchInput = document.createElement('input');
searchInput.setAttribute('type', 'text');
searchInput.setAttribute('name', 'search-input');

let searchSubmit = document.createElement('input');
searchSubmit.setAttribute('type', 'submit');
searchSubmit.value = 'Search';

nav.append(navList);
searchForm.append(searchInput, searchSubmit);

header.append(nav, searchForm);
document.body.prepend(header);