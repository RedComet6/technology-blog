// require needed packages, models
const router = require('express').Router();
const { User } = require('../../models');

// create new user route
router.post('/', async (req, res) => {
  try {
    // create new user from request body
    const userData = await User.create(req.body);

    // create session for new user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// existing user login route
router.post('/login', async (req, res) => {
  try {
    // locate user by email
    const userData = await User.findOne({ where: { email: req.body.email } });

    // if user cannot be found, notify
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // validate provided password
    const validPassword = await userData.checkPassword(req.body.password);

    // if password is not valid, notify
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // activate session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// logout route
router.post('/logout', (req, res) => {
  // if session is logged in, delete session
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
