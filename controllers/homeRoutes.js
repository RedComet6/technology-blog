// require needed packages/models
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// homepage route
router.get('/', async (req, res) => {
  try {
    // Get all posts, join with user and comments
    const postData = await Post.findAll({
      include: [User, Comment],
    });

    // serialize data so template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // pass serialized data and session login data into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// post info page
router.get('/posts/:id', async (req, res) => {
  try {
    // get single post and join with user and comments
    const postData = await Post.findByPk(req.params.id, {
      include: [User, { model: Comment, include: [User] }],
    });

    // serialize data so template can read it
    const post = postData.get({ plain: true });

    // pass serialized data and session login data into template
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a post page
router.get('/update/:id', async (req, res) => {
  try {
    // get a single post and join with user and comments
    const postData = await Post.findByPk(req.params.id, {
      include: [User, { model: Comment, include: [User] }],
    });

    // serialize data so template can read it
    const post = postData.get({ plain: true });

    // pass serialized data and session login data into template
    res.render('update', {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// user profile page, use withAuth middleware to prevent public access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // find the logged in user based on the session ID, join with posts
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    // serialize data so template can read it
    const user = userData.get({ plain: true });

    // pass serialized data and session login data into template
    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to profile route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
