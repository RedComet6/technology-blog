const newCommentHandler = async (event) => {
  event.preventDefault();

  const message = document.querySelector('#comment-message').value.trim();
  const post_id = event.target.getAttribute('data-id');

  if (message && post_id) {
    const response = await fetch(`/api/comments/${post_id}`, {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/posts/${post_id}`);
    } else {
      alert('Failed to create comment');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);
