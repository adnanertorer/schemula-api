const express = require('express');
const { create, getList, getById } = require('../controllers/payment-types');
const {
    getAccessToRoute
} = require('../middlewares/authorization/auth');

const router = express.Router();

router.post('/create', getAccessToRoute, create);
router.get('/', getAccessToRoute, getList);
router.get('/:id', getAccessToRoute, getById);

module.exports = router; 