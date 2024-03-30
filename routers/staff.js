const express = require('express');
const { create, getList, getById, remove } = require('../controllers/staffs');
const {
    getAccessToRoute
} = require('../middlewares/authorization/auth');

const router = express.Router();

router.post('/create', getAccessToRoute, create);
router.get('/', getAccessToRoute, getList);
router.get('/:id', getAccessToRoute, getById);
router.delete('/delete/:id', getAccessToRoute, remove);

module.exports = router;