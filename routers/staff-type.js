const express = require('express');
const { create } = require('../controllers/staff-types');
const {
    getAccessToRoute
} = require('../middlewares/authorization/auth');

const router = express.Router();

router.post('/create', getAccessToRoute, create);

module.exports = router; 