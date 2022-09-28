const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const itemRoutes = require('./itemRoutes');
const newEventRoutes = require('./newEvent');

router.use('/user', userRoutes);
router.use('/event', eventRoutes);
router.use('/item', itemRoutes);
router.use('/event-setup', newEventRoutes);

module.exports = router;