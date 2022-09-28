const router = require("express").Router();
const { Event, User, Item } = require("../models");
const withAuth = require("../utils/auth");
const Sequelize = require("sequelize");

// need to add withAuth to these routes after testing

// gets all events and renders homepage
router.get("/", withAuth, async (req, res) => {
  try {
    const eventData = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Serialize data so the template can read it
    const events = eventData.map((event) => event.get({ plain: true }));

    // res.status(200).json(events);
    res.render("home", {
      events,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/my-events', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('my-events', {
      ...user,
      logged_in: true,
      myEvents: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/event-setup', withAuth, async (req, res) => {
  try {
    res.render('event-setup', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// redirects to homepage if logged in
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
