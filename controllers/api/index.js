const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const itemRoutes = require('./itemRoutes');

router.use('/users', userRoutes);
router.use('/event', eventRoutes);
router.use('/item', itemRoutes);

module.exports = router;