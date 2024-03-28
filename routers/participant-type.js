const express = require('express');
const { create, getAll, remove, getById } = require('../controllers/participant-types');
const {
    getAccessToRoute
} = require('../middlewares/authorization/auth');

const router = express.Router();

router.post('/create', getAccessToRoute, create);
router.get('/', getAccessToRoute, getAll);
router.get('/:id', getAccessToRoute, getById);
router.delete('/delete/:id', getAccessToRoute, remove);

module.exports = router;