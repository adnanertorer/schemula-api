const express = require('express');
const { getUser } = require('../controllers/users');
const { checkUserExist } = require('../middlewares/database/databaseErrorHelpers');

const router = express.Router();

router.get('/:id', checkUserExist, getUser);
module.exports = router;