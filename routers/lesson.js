const express = require('express');
const { create, getById, getList, remove } = require('../controllers/lessons');
const {
    getAccessToRoute
} = require('../middlewares/authorization/auth');

const router = express.Router();

router.post('/create', getAccessToRoute, create);
router.get('/:id', getAccessToRoute, getById);
router.get('/', getAccessToRoute, getList);
router.delete('/delete/:id', getAccessToRoute, remove);

module.exports = router;