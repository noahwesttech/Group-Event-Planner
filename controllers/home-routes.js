const router = require("express").Router();
const { Event, User, Vote } = require("../models");
const withAuth = require('../utils/auth');

// send to event creation page, or if not authorized user,
// send to the login page.
router.get("/", withAuth, (req, res) => {
  Event.findAll({
    where: {
      user_id: req.session.user_id
    },
    include: [
        {
          model: User,
          attributes: ['username', 'id']
        },
        {
            model: Vote,
            attributes: ['id']
        }
    ]
  })
  .then(dbEventData => {
    // serialize events to regular objects
    let events = dbEventData.map(event => event.get({ plain: true }));

    // put events in desc order
    events = events.reverse();

    res.render('home', { 
      events,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// vote page for an event
router.get("/vote/:id", (req, res) => {
  Event.findOne({
    where: {
      id: req.params.id
    },
    include: [
        {
          model: User,
          attributes: ['username', 'id']
        },
        {
            model: Vote,
            attributes: ['id', 'event_id', 'days']
        }
    ]
  })
  .then(dbEventData => {
    // serialize events to regular objects
    const event = dbEventData.get({ plain: true });

    res.render('tally', { 
      event
    });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
