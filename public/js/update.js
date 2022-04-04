// handles update submission
const updateFormHandler = async (event) => {
  event.preventDefault();

  // assign variables to content of form inputs
  const title = document.querySelector('#post-title').value.trim();
  const description = document.querySelector('#post-desc').value.trim();
  const id = event.target.getAttribute('data-id');

  // if inputs exist
  if (title && description) {
    // make fetch to post update route
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // if successful, redirect to profile page
      document.location.replace('/profile');
    } else {
      alert('Failed to update post');
    }
  }
};

// event listener
document
  .querySelector('.update-post-form')
  .addEventListener('submit', updateFormHandler);
