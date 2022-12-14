const router = require('express').Router();
const { Item, Event, User } = require('../../models');
const withAuth = require('../../utils/auth');

// /api/item/ routes

// will need to add withAuth to routes after testing is done

// gets item by id
// router.get('/:id', withAuth, async (req, res) => {
//   try {
//     const itemData = await Item.findByPk(req.params.id, {
//       include: [
//         {
//             model: User,
//             attributes: ['username', 'id'],
//         },
//       ],
//     });

//     const items = itemData.get({ plain: true });
//     res.status(200).json(itemData);

//     // res.render('item', {
//     //   ...items,
//     //   logged_in: req.session.logged_in,
//     // });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// add-item endpoint
router.get('/:eventId', withAuth, async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.eventId, {
      include: [
        {
            model: User,
            attributes: ['username', 'id'],
        },
      ],
    });

    const event = eventData.get({ plain: true });
    // res.status(200).json(itemData);

    res.render('add-item', {
      ...event,
      event_id: req.params.eventId,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// creates new item
router.post('/:eventId', withAuth, async (req, res) => {
  try {
    const newItem = await Item.create({
      item_name: req.body.item,
      user_id: req.session.user_id,
      // user_id: req.body.user_id,
      event_id: req.params.eventId,
    });
    // console.log(req.body);
    res.status(200).json(newItem);
  } catch (err) {
    res.status(400).json(err);
  }
});

// deletes an item
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const itemData = await Item.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!itemData) {
      res.status(404).json({ message: 'No item found with this id!' });
      return;
    }

    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
