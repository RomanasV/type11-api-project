async function getAllUsers() {
  let res = await fetch('https://jsonplaceholder.typicode.com/users?_embed=posts');
  let usersData = await res.json();
  return usersData;
}

export { getAllUsers };