const express = require('express');
const router = express.Router();
const predict = require('../controllers/predictMarks');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validatePredict } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(predict.index))
    .post(isLoggedIn, upload.array('image'), validatePredict, catchAsync(predict.prediction))

// router.route('/result').get(catchAsync(predict.result))
router.route('/send-result').get(catchAsync(predict.sendMail))

module.exports = router;