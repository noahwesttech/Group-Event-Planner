const router = require('express').Router();
const { Item, Event, User } = require('../../models');
const withAuth = require('../../utils/auth');

// /api/item/ routes

// will need to add withAuth to routes after testing is done

// gets item by id
router.get('/:id', async (req, res) => {
  try {
    const itemData = await Item.findByPk(req.params.id, {
      include: [
        {
            model: User,
            attributes: ['username', 'id'],
        },
      ],
    });

    const items = itemData.get({ plain: true });
    res.status(200).json(itemData);

    // res.render('item', {
    //   ...items,
    //   logged_in: req.session.logged_in,
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

// creates new item
router.post('/:eventId', async (req, res) => {
  try {
    const newItem = await Item.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: req.params.postId,
    });
    // console.log(req.body);
    res.status(200).json(newItem);
  } catch (err) {
    res.status(400).json(err);
  }
});

// deletes an item
router.delete('/:id', async (req, res) => {
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
