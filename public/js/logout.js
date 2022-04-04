// handles logout
const logout = async () => {
  // make fetch to logout route
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // if successful, redirect to homepage
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

// event listener
document.querySelector('#logout').addEventListener('click', logout);
