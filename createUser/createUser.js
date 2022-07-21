import headerView from '../headerView.js';
import { createNewUser } from './createUserController.js';
import createUser from './createUserView.js';

function init() {
  headerView();

  let createUserForm = document.querySelector('#create-user-form');
  
  createUserForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // let {name, username, email} = event.target.elements;
    // console.log(name.value, username.value, email.value);

    let { elements } = event.target;

    let name = elements.name.value;
    let username = elements.username.value;
    let email = elements.email.value;
    let street = elements.street.value;
    let suite = elements.suite.value;
    let city = elements.city.value;
    let zipcode = elements.zip.value;
    let phone = elements.phone.value;
    let website = elements.website.value;
    let companyName = elements['company-name'].value;
    let catchPhrase = elements['company-catchphrase'].value;
    let bs = elements['company-bs'].value;

    let newUser = {
      name,
      username,
      email,
      address: {
        street,
        suite,
        city,
        zipcode,
      },
      phone,
      website,
      company: {
        name: companyName,
        catchPhrase,
        bs,
      }
    }

    let createdUser = await createNewUser(newUser);
    createUser(createdUser, event.target);

    event.target.reset();
  })
}

init();