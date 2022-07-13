let searchResults = document.querySelector('#search-results');
let usersList = document.createElement('ul');
let usersListTitle = document.createElement('h3');

let postsList = document.createElement('ul');
let postsListTitle = document.createElement('h3');

let albumsList = document.createElement('ul');
let albumsListTitle = document.createElement('h3');

searchResults.append(usersList, postsList, albumsList);
usersList.before(usersListTitle);
postsList.before(postsListTitle);
albumsList.before(albumsListTitle);

function init() {
  outerSearchForm();
  innerSearchForm();
}

function outerSearchForm() {
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let searchPhrase = urlParams.get('search-input');

  fetch(`https://jsonplaceholder.typicode.com/users?username=${searchPhrase}`)
    .then(res => res.json())
    .then(users => {
      if (users.length > 0) {
  
  
        usersListTitle.textContent = 'Users:'
        users.map(user => {
          renderListElement({
            content: user.name,
            href: `./user.html?user_id=${user.id}`,
            parentElement: usersList,
          })
        })
  
  
      } else {
        fetch(`https://jsonplaceholder.typicode.com/users?name=${searchPhrase}`)
          .then(res => res.json())
          .then(usersByName => {
            if (usersByName.length > 0) {
  
  
              usersListTitle.textContent = 'Users:'
              usersByName.map(user => {
                renderListElement({
                  content: user.name,
                  href: `./user.html?user_id=${user.id}`,
                  parentElement: usersList,
                })
              })
  
  
            } else {
              fetch(`https://jsonplaceholder.typicode.com/users?email=${searchPhrase}`)
                .then(res => res.json())
                .then(usersByEmail => {
                  if (usersByEmail.length > 0) {
  
  
                    usersListTitle.textContent = 'Users:'
                    usersByEmail.map(user => {
                      renderListElement({
                        content: user.name,
                        href: `./user.html?user_id=${user.id}`,
                        parentElement: usersList,
                      })
                    })
  
  
                  } else {
                    usersListTitle.textContent = 'Users not found.'
                  }
                })
            } 
          })
      }
    })
  
  let postsUrl = `title=${searchPhrase}`;
  renderAllPosts(postsUrl);
  
  let albumsUrl = `title=${searchPhrase}`;
  renderAllAlbums(albumsUrl);
}

function innerSearchForm() {
  let searchPageForm = document.querySelector('#search-page-form');
  
  searchPageForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    usersList.innerHTML = '';
    postsList.innerHTML = '';
    albumsList.innerHTML = '';
  
    let searchInput = event.target.elements['search-input'].value;
  
    fetch(`https://jsonplaceholder.typicode.com/users?username_like=${searchInput}`)
      .then(res => res.json())
      .then(users => {
        if (users.length > 0) {
  
  
          usersListTitle.textContent = 'Users:'
          users.map(user => {
            // let userItem = document.createElement('li');
            // userItem.innerHTML = `<a href="./user.html?user_id=${user.id}">${user.name}</a>`;
            // usersList.append(userItem);
  
            // renderListElement({
            //   content: user.name,
            //   href: `./user.html?user_id=${user.id}`,
            //   parentElement: usersList,
            // });
            
            let userData = {
              content: user.name,
              href: `./user.html?user_id=${user.id}`,
              parentElement: usersList,
            }
  
            renderListElement(userData);
          })
        } else {
          fetch(`https://jsonplaceholder.typicode.com/users?name_like=${searchInput}`)
            .then(res => res.json())
            .then(usersByName => {
              if (usersByName.length > 0) {
  
  
                usersListTitle.textContent = 'Users:'
                usersByName.map(user => {
                  let userData = {
                    content: user.name,
                    href: `./user.html?user_id=${user.id}`,
                    parentElement: usersList,
                  }
        
                  renderListElement(userData);
                })
  
  
              } else {
                fetch(`https://jsonplaceholder.typicode.com/users?email_like=${searchInput}`)
                  .then(res => res.json())
                  .then(usersByEmail => {
                    if (usersByEmail.length > 0) {
  
  
                      usersListTitle.textContent = 'Users:'
                      usersByEmail.map(user => {
                        let userData = {
                          content: user.name,
                          href: `./user.html?user_id=${user.id}`,
                          parentElement: usersList,
                        }
              
                        renderListElement(userData);
                      })
  
  
                    } else {
                      usersListTitle.textContent = 'Users not found.'
                    }
                  })
              } 
            })
        }
      })

    let postsUrl = `title_like=${searchInput}`;
    renderAllPosts(postsUrl);

    let albumsUrl = `title_like=${searchInput}`;
    renderAllAlbums(albumsUrl);
  })
}

function renderAllUsers() {

}

function renderAllPosts(searchText) {
  fetch(`https://jsonplaceholder.typicode.com/posts?${searchText}`)
    .then(res => res.json())
    .then(posts => {
      if (posts.length > 0) {
        postsListTitle.textContent = 'Posts:';
        posts.map(post => {
          let postData = {
            content: post.title,
            href: `./post.html?post_id=${post.id}`,
            parentElement: postsList,
          }
          renderListElement(postData);
        })
      } else {
        postsListTitle.textContent = 'Posts not found.';
      }
    })
}

function renderAllAlbums(searchText) {
  fetch(`https://jsonplaceholder.typicode.com/albums?${searchText}`)
    .then(res => res.json())
    .then(albums => {
      albumsListTitle.textContent = 'Albums:';
      if (albums.length > 0) {

        albums.map(album => {
          let albumData = {
            content: album.title,
            href: `./album.html?album_id=${album.id}`,
            parentElement: albumsList
          };
          renderListElement(albumData);
        })

      } else {
        albumsListTitle.textContent = 'Albums not found.';
      }
    })
}

function renderListElement(data) {
  let itemElement = document.createElement('li');
  itemElement.classList.add('search-item');
  itemElement.innerHTML = `<a href="${data.href}">${data.content}</a>`;
  data.parentElement.append(itemElement);
}

init();