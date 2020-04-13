var express = require('express');
var router = express.Router();

//   MySQL 로드
var pool = require('./dbutil/mysqlConn');
var batis9 = require("./dbutil/nineBatis");
// batis9.loadQuery(__dirname +'/sql', true);

const asyncHandler = require('express-async-handler');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 * https://gofnrk.tistory.com/61
 */
router.get('/list', asyncHandler(async (req,res,next) => {
  var sql = batis9.getQuery('selectBoardList', {name:'홍길동'});
  const data = await pool.query(sql);
  return res.json(data[0]);
}));

module.exports = router;
