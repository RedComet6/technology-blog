// require needed packages, models
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// create comment route
router.post('/:post_id', withAuth, async (req, res) => {
  try {
    // create new comment from request body
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: req.params.post_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
