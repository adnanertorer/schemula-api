const express = require('express');
const { create, getById, getList, remove, getListByLesson } = require('../controllers/lesson-packages');
const {
    getAccessToRoute
} = require('../middlewares/authorization/auth');

const router = express.Router();

router.post('/create', getAccessToRoute, create);
router.get('/:id', getAccessToRoute, getById);
router.get('/', getAccessToRoute, getList);
router.delete('/delete/:id', getAccessToRoute, remove);
router.get('/get-by-lesson/:id', getAccessToRoute, getListByLesson);

module.exports = router;