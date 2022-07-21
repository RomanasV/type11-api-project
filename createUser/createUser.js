import headerView from '../headerView.js';

function init() {
  headerView();

  let createUserForm = document.querySelector('#create-user-form');
  
  createUserForm.addEventListener('submit', (event) => {
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

    let userUserData = {
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

    console.log(userUserData);

    event.target.reset();
  })
}

init();