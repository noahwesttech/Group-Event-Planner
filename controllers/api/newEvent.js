const router = require("express").Router();
const { User, Event, Item } = require("../../models");
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    res.render('event-setup', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Event.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;