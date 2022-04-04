// sign in for existing users
const loginFormHandler = async (event) => {
  event.preventDefault();

  // assign variables to content of form inputs
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // if both inputs exist
  if (email && password) {
    // make fetch to login route
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

// sign up for new users
const signupFormHandler = async (event) => {
  event.preventDefault();

  // assign variables to content of form inputs
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // if all inputs exist
  if (name && email && password) {
    // make fetch to new user route
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // if successful, redirect to profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

// event listeners
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
