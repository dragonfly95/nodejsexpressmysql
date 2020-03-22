var express = require('express');
var router = express.Router();

const asyncHandler = require('express-async-handler');

/* GET users listing. */
router.get('/', asyncHandler(async (req, res, next) => {
  res.render('store', { title: 'Express' });
}));

module.exports = router;