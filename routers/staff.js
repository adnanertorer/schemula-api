const express = require('express');
const { create } = require('../controllers/staffs');
const {
    getAccessToRoute
} = require('../middlewares/authorization/auth');

const router = express.Router();

router.post('/create', getAccessToRoute, create);

module.exports = router;