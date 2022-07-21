export default function createUser(user, formElement) {
  let userInfo = document.createElement('div');

  userInfo.innerHTML = `<h2>${user.name} (${user.username})</h2>
                        <ul>
                          <li><strong>Email:</strong> <a href="mailto:${user.email}">${user.email}</a></li>
                          <li><strong>Phone:</strong> <a href="tel:${user.phone}">${user.phone}</a></li>
                          <li><strong>Address:</strong> <a href="#">${user.address.street} ${user.address.suite}, ${user.address.city} (zipcode: ${user.address.zipcode})</a></li>
                          <li><strong>Website:</strong> <a href="${user.website}" target="_blank">${user.website}</a></li>
                          <li><strong>Work:</strong> ${user.company.name}</li>
                        </ul>`;
  formElement.after(userInfo);
}