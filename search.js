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

  // renderAllUsers(`=${searchPhrase}`);
  // renderAllPosts(`title=${searchPhrase}`);
  // renderAllAlbums(`title=${searchPhrase}`);

  let usersUrl = `=${searchPhrase}`;
  renderAllUsers(usersUrl);
  
  let postsUrl = `title=${searchPhrase}`;
  renderAllPosts(postsUrl);
  
  let albumsUrl = `title=${searchPhrase}`;
  renderAllAlbums(albumsUrl);
}

function innerSearchForm() {
  let searchPageForm = document.querySelector('#search-page-form');
  
  searchPageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    let searchInput = event.target.elements['search-input'].value;
    
    let usersUrl = `_like=${searchInput}`;
    renderAllUsers(usersUrl);

    let postsUrl = `title_like=${searchInput}`;
    renderAllPosts(postsUrl);

    let albumsUrl = `title_like=${searchInput}`;
    renderAllAlbums(albumsUrl);
  })
}

function renderAllUsers(searchText) {
  usersList.innerHTML = '';

  fetch(`https://jsonplaceholder.typicode.com/users?username${searchText}`)
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
        fetch(`https://jsonplaceholder.typicode.com/users?name${searchText}`)
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
              fetch(`https://jsonplaceholder.typicode.com/users?email${searchText}`)
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
                    usersListTitle.textContent = 'Users not found.';
                  }
                })
            } 
          })
      }
    })
}

function renderAllPosts(searchText) {
  postsList.innerHTML = '';

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
  albumsList.innerHTML = '';

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


// function test(num) {
//   if (num < 0) {
//     console.log('blogas skaicius');
//   } else {

//     if (num < 18) {
//       console.log('negalima pirkti');
//     } else {
      
//       console.log('pirkti gali');

//       if (num > 120) {
//         console.log('amzius per didelis')
//       } else {
//         console.log('netinkami duomenys')
//       }
//     }
//   }
// }

// function test(num) {
//   if (num < 0) {
//     console.log('blogas skaicius');
//     return;
//   } 
  
//   if (num < 18) {
//     console.log('negalima pirkti');
//     return;
//   }

//   if (num < 120) {
//     console.log('Pirkti galima');
//     return;
//   }

//   // if (num >= 120) {
//   //   console.log('skaicius per didelis');
//   // } else {
//   //   console.log('ERROR');
//   // }

//   if (num >= 120) {
//     console.log('skaicius per didelis');
//     return;
//   } 

//   console.log('ERROR');
// }

// function test(num) {
//   if (num < 0) {
//     return 'blogas skaicius';
//   } 
  
//   if (num < 18) {
//     return 'negalima pirkti';
//   }

//   if (num < 120) {
//     return 'Pirkti galima';
//   }

//   // if (num >= 120) {
//   //   console.log('skaicius per didelis');
//   // } else {
//   //   console.log('ERROR');
//   // }

//   if (num >= 120) {
//     return 'skaicius per didelis';
//   } 

//   return 'ERROR';
// }

// console.log(test(-5));