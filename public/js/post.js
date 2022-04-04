// handles new comment submission
const newCommentHandler = async (event) => {
  event.preventDefault();

  // assign variables to form content
  const message = document.querySelector('#comment-message').value.trim();
  const post_id = event.target.getAttribute('data-id');

  // if both inputs exist
  if (message && post_id) {
    // make fetch to comment creation route
    const response = await fetch(`/api/comments/${post_id}`, {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // if successful, redirect to post page
      document.location.replace(`/posts/${post_id}`);
    } else {
      alert('Failed to create comment');
    }
  }
};

// event listener
document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);
