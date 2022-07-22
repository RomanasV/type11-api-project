async function editPost(post) {
  let res = await fetch('https://jsonplaceholder.typicode.com/posts/' + post.id, {
    method: 'PUT',
    body: JSON.stringify(post),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return await res.json();
}

export {
  editPost
}