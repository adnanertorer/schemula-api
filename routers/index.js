const express = require('express');
const auth = require('./auth');
const user = require('./user');
const company = require('./company');
const category = require('./category');
const subCategory = require('./sub-category');
const lesson = require('./lesson');
const paymentType = require('./payment-type');
const staffType = require('./staff-type'); 
const staff = require('./staff');
const lessonPackage = require('./lesson-packages');
const participantTypes = require('./participant-type');
const lessonEducator = require('./lesson-educator');

//api
const router = express.Router();

router.use('/auth', auth);
router.use('/users', user);
router.use('/company', company);
router.use('/category', category);
router.use('/sub-category', subCategory);
router.use('/lessons', lesson);
router.use('/payment-types', paymentType);
router.use('/staff-types', staffType);
router.use('/staffs', staff);
router.use('/lesson-packages', lessonPackage);
router.use('/participant-types', participantTypes);
router.use('/lesson-educators', lessonEducator);


module.exports = router;