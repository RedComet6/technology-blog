// require needed packages, models
const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// create new post route
router.post('/', withAuth, async (req, res) => {
  try {
    // create new post from request body
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update post route
router.put('/:id', withAuth, async (req, res) => {
  try {
    // find post with matching id, and update its data to submitted request body
    const updatePost = await Post.update(
      {
        ...req.body,
        user_id: req.session.user_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(updatePost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete post route
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // find post with matching id, and delete it
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    // if post with matching id cannot be found, notify user
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
