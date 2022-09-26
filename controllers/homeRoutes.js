const router = require('express').Router();
const { Event, User, Item } = require('../models');
const withAuth = require('../utils/auth');
const Sequelize = require('sequelize');

// need to add withAuth to these routes after testing

// gets all events and renders homepage
router.get('/', async (req, res) => {
  try {
    const eventData = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const events = eventData.map((event) => event.get({ plain: true }));

    res.status(200).json(events);
    // res.render('homepage', {
    //   events,
    //   logged_in: req.session.logged_in,
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

// redirects to homepage if logged in
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;