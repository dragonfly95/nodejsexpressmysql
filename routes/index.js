var express = require('express');
var router = express.Router();

const multer = require('multer');
const mkdirp = require('mkdirp');
const path  = require('path');

// 기타 express 코드
var _storage = multer.diskStorage({
  destination: function(req,file,cb) {
    var aa = new Date();
    var year = aa.getFullYear();
    var month = aa.getMonth() + 1;
    if(month < 10) month = "0" + month;
    var dir = "public/uploads/"+ year +"/"+ month +"/";
    mkdirp(dir, function(err) {
      if(err)
        console.err(err);
    })
    cb(null,dir);
  },
  filename: function(req,file,cb) {
    const ext = path.extname(file.originalname);
      cb(null,  file.fieldname + '-' + Date.now() +'' + ext)
  }
})
var upload = multer({storage: _storage})

router.post('/up', upload.single('img'), (req, res) => {
  console.log(req.file);
  res.json(req.file); 
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
