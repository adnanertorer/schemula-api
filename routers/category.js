const express = require('express');
const { create, getCategory, getAllCategory } = require('../controllers/category');
const {
    getAccessToRoute
} = require('../middlewares/authorization/auth');

const router = express.Router();

router.get('/', getAccessToRoute, getAllCategory);
router.post('/create', getAccessToRoute, create);
router.get('/:id', getAccessToRoute, getCategory);

module.exports = router; 