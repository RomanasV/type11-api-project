function headerView() {
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
  
  nav.append(navList);
  
  header.append(nav);
  
  if (!pathname.includes('search.html')) {
    let searchForm = document.createElement('form');
    searchForm.setAttribute('action', './search.html');
  
    let searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('name', 'search-input');
  
    let searchSubmit = document.createElement('input');
    searchSubmit.setAttribute('type', 'submit');
    searchSubmit.value = 'Search';
  
    searchForm.append(searchInput, searchSubmit);
  
    header.append(searchForm);
  }
  
  document.body.prepend(header);
}

export default headerView;