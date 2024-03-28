const express = require('express');
const { create } = require('../controllers/company');

const router = express.Router();

router.post('/create', create);

module.exports = router;