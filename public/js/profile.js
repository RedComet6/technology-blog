// handles new post submission
const newFormHandler = async (event) => {
  event.preventDefault();

  // assign variables to content of form inputs
  const title = document.querySelector('#post-title').value.trim();
  const description = document.querySelector('#post-desc').value.trim();

  // if both inputs exist
  if (title && description) {
    // make fetch to post creation route
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // if successful, redirect to profile page
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

// handles edit or delete of user's posts
const buttonHandler = async (event) => {
  // if target has data-id attribute
  if (event.target.hasAttribute('data-id')) {
    // assign var to content of data-id attribute
    const id = event.target.getAttribute('data-id');

    // if button clicked is delete button
    if (event.target.getAttribute('id') === 'delButton') {
      // make fetch to post deletion route
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // if successful, redirect to profile page
        document.location.replace('/profile');
      } else {
        alert('Failed to delete post');
      }
      // if button clicked is edit button
    } else if (event.target.getAttribute('id') === 'editButton') {
      // redirect to update page
      document.location.replace(`/update/${id}`);
    }
  }
};

// event listeners
document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document.querySelector('.post-list').addEventListener('click', buttonHandler);
