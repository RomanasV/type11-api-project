async function init() {
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let postId = urlParams.get('post_id');
  
  let res = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId);
  let post = await res.json();

  console.log(post.title);
  console.log(post.body);
  console.log(post.userId);
}

init();