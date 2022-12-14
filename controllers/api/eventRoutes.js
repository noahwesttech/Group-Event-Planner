const router = require("express").Router();
const { User, Event, Item } = require("../../models");
const withAuth = require('../../utils/auth');
const { sendInviteEmails } = require("../../utils/send-emails");

// /api/event/ routes

// gets all events
router.get('/', withAuth, async (req, res) => {
  try {
    const eventData = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ['username', 'id'],
        },
      ],
    });

    // Serialize data so the template can read it
    const events = eventData.map((event) => event.get({ plain: true }));

    res.status(200).json(events);
    res.render('homepage', {
      events,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// gets event by id
router.get('/:id', withAuth, async (req, res) => {
    try {
        const eventData = await Event.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username', 'id'],
                },
                {
                    model: Item,
                    attributes: ['item_name', 'user_id', 'id'],
                    include: {
                        model: User,
                        attributes: ['username', 'id'],
                    },
                },
            ],
        });

        const event = eventData.get({ plain: true });
        
        res.render('event-view', {
        ...event,
        id: req.params.id,
        logged_in: req.session.logged_in,
        userId: req.session.user_id,
        items_length: eventData.items.length,
    });
    
        // res.status(200).json(eventData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// updates an event
router.put('/:id',  withAuth, async (req, res) => {
  try {
    const updatedEvent = await Event.update(
      { event_title: req.body.event_title,
        event_date: req.body.event_date,
        event_location: req.body.event_location,
        event_description: req.body.event_description,
        invite_emails: req.body.invite_emails,
       },
      { where: { id: req.params.id } }
    );
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

// creates new event
// this is where we'll probably need to add the email function
router.post('/', withAuth, async (req, res) => {
  try {
    const eventEmails = req.body.invite_emails;
    const eventTitle = req.body.event_title;
    const eventDate = req.body.event_date;
    const eventLocation = req.body.event_location;
    
    const newEvent = await Event.create({
      ...req.body,
      user_id: req.session.user_id,
      // user_id: req.body.user_id,
      event_title: req.body.event_title,
      event_location: req.body.event_location,
      event_date: req.body.event_date,
      event_description: req.body.event_description,
      invite_emails: eventEmails,
    });
    const newEventId = newEvent.id;
    sendInviteEmails(eventEmails, eventTitle, eventDate, eventLocation, newEventId);
    // console.log(req.body);
    res.status(200).json(newEvent);
  } catch (err) {
    res.status(400).json(err);
  }
});

// deletes an event
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const eventData = await Event.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!eventData) {
      res.status(404).json({ message: 'No event found with this id!' });
      return;
    }

    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
    console.log('error:', err);
  }
});

module.exports = router;