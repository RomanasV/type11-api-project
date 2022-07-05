let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let postId = urlParams.get('post_id');

console.log(postId);

fetch('https://jsonplaceholder.typicode.com/posts/' + postId)
  .then(res => res.json())
  .then(post => {
    console.log(post);
  })