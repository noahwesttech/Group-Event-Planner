const router = require('express').Router();
const { Event, User, Item } = require('../models');
const withAuth = require('../utils/auth');
const Sequelize = require('sequelize');

module.exports = router;