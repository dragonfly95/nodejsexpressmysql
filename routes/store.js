var express = require('express');
var router = express.Router();

//   MySQL 로드
var pool = require('./dbutil/mysqlConn');
var batis9 = require("./dbutil/nineBatis");
// batis9.loadQuery(__dirname +'/sql', true);

const asyncHandler = require('express-async-handler');

const SUCESS_MSG = {'result': 'SUCCESS'};
const ERROR_MSG = {'result': 'ERROR'};
function fn_error(err) {
  return {'result': err.errno + ': ' + err.message}
}

const session = {
  groupID : 99999
  ,storeID : 666
}

/* GET users listing. */
router.get('/', asyncHandler(async (req, res, next) => {
  res.render('store', { title: 'Express' });
}));

router.get('/test/test.pug', asyncHandler(async (req, res, next) => {
  res.render('test/test', { title: 'Express' });
}));

/***************************************************************************** */
/** cardreader 화면 - easyui grid */
router.get('/cardreader.pug', asyncHandler(async (req, res, next) => {
  res.render('cardreader', { title: 'cardreader 목록' });
}));


/**
 * CARDREADER 목록
 */
router.get('/cardreader', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountCardreader');
  var sql_list  = batis9.getQuery('selectListCardreader');
  try {
    const data = await pool.query(sql_count+";"+sql_list);
    res.json({
      "total": data[0][0][0].cnt,
      "rows": data[0][1]
    });
  } catch(err) {
    return res.json(fn_error(err));
  }

}));



/** CARDREADER 1건조회 */
router.get('/cardreader/:groupID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailCardreader', {}) );
  return res.json(data[0]);
}));

/** CARDREADER 등록 */
router.post('/cardreader', asyncHandler(async (req,res,next) => {
  const aa = await pool.query( batis9.getQuery('insertCardreader', req.body) );
  return res.json(SUCESS_MSG);
}));

/** CARDREADER 수정 */
router.put('/cardreader/:storeID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('updateCardreader', req.body) );
  return res.json(SUCESS_MSG);
}));

/** CARDREADER 삭제 */
router.delete('/cardreader/:storeID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('deleteCardreader', req.body) );
  return res.json(SUCESS_MSG);
}));


/***************************************************************************** */
/** deviceset 화면 - easyui grid */
router.get('/deviceset.pug', asyncHandler(async (req, res, next) => {
  res.render('deviceset', { title: 'deviceset 목록' });
}));

/** deviceset 목록 */
router.get('/deviceset', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountDeviceset');
  var sql_list  = batis9.getQuery('selectListDeviceset');
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
    "total": data[0][0][0].cnt,
    "rows": data[0][1]
  });
}));

/** deviceset 1건조회 */
router.get('/deviceset/:mainDeviceID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailDeviceset', {}) );
  return res.json(data[0]);
}));

/** deviceset 등록*/
router.post('/deviceset', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('insertDeviceset', {}) );
  return res.json(SUCESS_MSG);
}));

/** deviceset 수정 */
router.put('/deviceset/:mainDeviceID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('updateDeviceset', {}) );
  return res.json(SUCESS_MSG);
}));

/** deviceset 삭제 */
router.delete('/deviceset/:mainDeviceID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('deleteDeviceset', {}) );
  return res.json(SUCESS_MSG);
}));



/***************************************************************************** */
/** item 화면 - easyui grid */
router.get('/item.pug', asyncHandler(async (req, res, next) => {
  res.render('item', { title: 'item 목록' });
}));

/** item 목록 */
router.get('/item', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountItem', session);
  var sql_list  = batis9.getQuery('selectListItem', session);
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
    "total": data[0][0][0].cnt,
    "rows": data[0][1]
  });
}));

/** item 1건조회 */
router.get('/item/:itemID', asyncHandler(async (req,res,next) => {
  var itemVO = Object.assign({"itemID": req.params.itemID}, session);
  const data = await pool.query( batis9.getQuery('selectDetailItem', itemVO) );
  return res.json({
    "rows":data[0][0]
  });
}));

/** item 등록*/
router.post('/item', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('insertItem', req.body) );
  return res.json(SUCESS_MSG);
}));

/** item 수정 */
router.put('/item/:itemID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('updateItem', req.body) );
  return res.json(SUCESS_MSG);
}));

/** item 삭제 */
router.delete('/item/:itemID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('deleteItem', req.body) );
  return res.json(SUCESS_MSG);
}));




/***************************************************************************** */
/** itemmodifiergroup 화면 - easyui grid */
router.get('/itemmodifiergroup.pug', asyncHandler(async (req, res, next) => {
  res.render('itemmodifiergroup', { title: 'itemmodifiergroup 목록' });
}));


/** itemmodifiergroup 목록 */
router.get('/itemmodifiergroup', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountItemmodifiergroup');
  var sql_list  = batis9.getQuery('selectListItemmodifiergroup');
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
    "total": data[0][0][0].cnt,
    "rows": data[0][1]
  });
}));

/** itemmodifiergroup 1건조회 */
router.get('/itemmodifiergroup/:modifierGroupID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailItemmodifiergroup', {}) );
  return res.json(data[0]);
}));

/** itemmodifiergroup 등록*/
router.post('/itemmodifiergroup', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('insertItemmodifiergroup', {}) );
  return res.json(SUCESS_MSG);
}));

/** itemmodifiergroup 수정 */
router.put('/itemmodifiergroup/:modifierGroupID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('updateItemmodifiergroup', {}) );
  return res.json(SUCESS_MSG);
}));

/** itemmodifiergroup 삭제 */
router.delete('/itemmodifiergroup/:modifierGroupID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('deleteItemmodifiergroup', {}) );
  return res.json(SUCESS_MSG);
}));



/***************************************************************************** */
/** kiosk 화면 - easyui grid */
router.get('/kiosk.pug', asyncHandler(async (req, res, next) => {
  res.render('kiosk', { title: 'kiosk 목록' });
}));

/** kiosk 목록 */
router.get('/kiosk', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountKiosk');
  var sql_list  = batis9.getQuery('selectListKiosk');
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
    "total": data[0][0][0].cnt,
    "rows": data[0][1]
  });
}));

/** kiosk 1건조회 */
router.get('/kiosk/:kioskID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailKiosk', req.body) );
  return res.json(data[0]);
}));

/** kiosk 등록*/
router.post('/kiosk', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('insertKiosk', req.body) );
  return res.json(SUCESS_MSG);
}));

/** kiosk 수정 */
router.put('/kiosk/:kioskID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('updateKiosk', req.body) );
  return res.json(SUCESS_MSG);
}));

/** kiosk 삭제 */
router.delete('/kiosk/:kioskID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('deleteKiosk', req.body) );
  return res.json(SUCESS_MSG);
}));




/***************************************************************************** */
/** menu 화면 - easyui grid */
router.get('/menu.pug', asyncHandler(async (req, res, next) => {
  res.render('menu', { title: 'menu 목록' });
}));

/** menu 목록 */
router.get('/menu', asyncHandler(async (req,res,next) => {
  var menu = Object.assign(req.query, session);
  var sql_count = batis9.getQuery('selectCountMenu', menu);
  var sql_list  = batis9.getQuery('selectListMenu', menu);
  if(req.query.menuGroup != undefined) {
    sql_count += " and menuGroup = '"+ req.query.menuGroup +"'";
    sql_list += " and menuGroup = '"+ req.query.menuGroup +"'";
  }
  const data = await pool.query(sql_count+";"+sql_list);
  res.json({
    "total": data[0][0][0].cnt,
    "rows": data[0][1]
  });
}));

/** menu 1건조회 */
router.get('/menu/:menuID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailMenu', {}) );
  return res.json(data[0]);
}));

/** menu 등록*/
router.post('/menu', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('insertMenu', {}) );
  return res.json(SUCESS_MSG);
}));

/** menu 수정 */
router.put('/menu/:menuID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('updateMenu', {}) );
  return res.json(SUCESS_MSG);
}));

/** menu 삭제 */
router.delete('/menu/:menuID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('deleteMenu', {}) );
  return res.json(SUCESS_MSG);
}));



/***************************************************************************** */
/** menugroup화면 - easyui grid */
router.get('/menugroup.pug', asyncHandler(async (req, res, next) => {
  res.render('menugroup', { title: 'menugroup 목록' });
}));

/** menugroup 목록 */
router.get('/menugroup', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountMenugroup', session);
  var sql_list  = batis9.getQuery('selectListMenugroup', session);
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
    "total": data[0][0][0].cnt,
    "rows": data[0][1]
  });
}));

/** menugroup 1건조회 */
router.get('/menugroup/:menugroupID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailMenugroup', {}) );
  return res.json(data[0]);
}));

/** menugroup 등록*/
router.post('/menugroup', asyncHandler(async (req,res,next) => {
  var menugroup = Object.assign(req.body, session);
  await pool.query( batis9.getQuery('insertMenugroup', menugroup) );
  return res.json(SUCESS_MSG);
}));

/** menugroup 수정 */
router.put('/menugroup/:menugroupID', asyncHandler(async (req,res,next) => {
  var menugroup = Object.assign(req.body, session);
  await pool.query( batis9.getQuery('updateMenugroup', menugroup) );
  return res.json(SUCESS_MSG);
}));

/** menugroup 삭제 */
router.delete('/menugroup/:menugroupID', asyncHandler(async (req,res,next) => {
  var menugroup = Object.assign(req.body, session);
  await pool.query( batis9.getQuery('deleteMenugroup', menugroup) );
  return res.json(SUCESS_MSG);
}));


router.get('/menumodifier.pug', asyncHandler(async (req, res, next) => {
  res.render('menumodifier', { title: 'menumodifier 목록' });
}));

/***************************************************************************** */
/** menuitem화면 - easyui grid */
router.get('/menuitem.pug', asyncHandler(async (req, res, next) => {
  res.render('menuitem', { title: 'menuitem 목록' });
}));

/** menuitem 목록 */
router.get('/menuitem', asyncHandler(async (req,res,next) => {
  const menuitem = Object.assign(req.query, session);
  var sql_count = batis9.getQuery('selectCountMenuitem', menuitem);
  var sql_list  = batis9.getQuery('selectListMenuitem', menuitem);
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
    "total": data[0][0][0].cnt,
    "rows": data[0][1]
  });
}));

/** menuitem 1건조회 */
router.get('/menuitem/:menuitemID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailMenuitem', {}) );
  return res.json(data[0]);
}));

/** menuitem 등록*/
router.post('/menuitem', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('insertMenuitem', {}) );
  return res.json(SUCESS_MSG);
}));

/** menuitem 수정 */
router.put('/menuitem/:menuitemID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('updateMenuitem', {}) );
  return res.json(SUCESS_MSG);
}));

/** menuitem 삭제 */
router.delete('/menuitem/:menuitemID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('deleteMenuitem', {}) );
  return res.json(SUCESS_MSG);
}));




/***************************************************************************** */
/** modifiergroup화면 - easyui grid */
router.get('/modifiergroup.pug', asyncHandler(async (req, res, next) => {
  res.render('modifiergroup', { title: 'modifiergroup 목록' });
}));

/** modifiergroup 목록 */
router.get('/modifiergroup', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountModifiergroup', session);
  var sql_list  = batis9.getQuery('selectListModifiergroup', session);
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
    "total": data[0][0][0].cnt,
    "rows": data[0][1]
  });
}));

/** modifiergroup 1건조회 */
router.get('/modifiergroup/:modifiergroupID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailModifiergroup', {}) );
  return res.json(data[0]);
}));

/** modifiergroup 등록*/
router.post('/modifiergroup', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('insertModifiergroup', {}) );
  return res.json(SUCESS_MSG);
}));

/** modifiergroup 수정 */
router.put('/modifiergroup/:modifiergroupID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('updateModifiergroup', {}) );
  return res.json(SUCESS_MSG);
}));

/** modifiergroup 삭제 */
router.delete('/modifiergroup/:modifiergroupID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('deleteModifiergroup', {}) );
  return res.json(SUCESS_MSG);
}));





/***************************************************************************** */
/** modifiergroupitem화면 - easyui grid */
router.get('/modifiergroupitem.pug', asyncHandler(async (req, res, next) => {
  res.render('modifiergroupitem', { title: 'modifiergroupitem 목록' });
}));

/** modifiergroupitem 목록 */
router.get('/modifiergroupitem', asyncHandler(async (req,res,next) => {
  var modifiergroup = Object.assign(req.query, session);
  var sql_count = batis9.getQuery('selectCountModifiergroupitem', modifiergroup);
  var sql_list  = batis9.getQuery('selectListModifiergroupitem', modifiergroup);
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
    "total": data[0][0][0].cnt,
    "rows": data[0][1]
  });

}));

/** modifiergroupitem 1건조회 */
router.get('/modifiergroupitem/:modifiergroupitemID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailModifiergroupitem', {}) );
  return res.json(data[0]);
}));

/** modifiergroupitem 등록*/
router.post('/modifiergroupitem', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('insertModifiergroupitem', {}) );
  return res.json(SUCESS_MSG);
}));

/** modifiergroupitem 수정 */
router.put('/modifiergroupitem/:modifiergroupitemID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('updateModifiergroupitem', {}) );
  return res.json(SUCESS_MSG);
}));

/** modifiergroupitem 삭제 */
router.delete('/modifiergroupitem/:modifiergroupitemID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('deleteModifiergroupitem', {}) );
  return res.json(SUCESS_MSG);
}));




/***************************************************************************** */
/** modifieritem화면 - easyui grid */
router.get('/modifieritem.pug', asyncHandler(async (req, res, next) => {
  res.render('modifieritem', { title: 'modifieritem 목록' });
}));

/** modifieritem 목록 */
router.get('/modifieritem', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountModifieritem', session);
  var sql_list  = batis9.getQuery('selectListModifieritem', session);
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
    "total": data[0][0][0].cnt,
    "rows": data[0][1]
  });
}));

/** modifieritem 1건조회 */
router.get('/modifieritem/:modifieritemID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailModifieritem', {}) );
  return res.json(data[0]);
}));

/** modifieritem 등록*/
router.post('/modifieritem', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('insertModifieritem', {}) );
  return res.json(SUCESS_MSG);
}));

/** modifieritem 수정 */
router.put('/modifieritem/:modifieritemID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('updateModifieritem', {}) );
  return res.json(SUCESS_MSG);
}));

/** modifieritem 삭제 */
router.delete('/modifieritem/:modifieritemID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('deleteModifieritem', {}) );
  return res.json(SUCESS_MSG);
}));





/***************************************************************************** */
/** 포스화면 - easyui grid */
router.get('/pos.pug', asyncHandler(async (req, res, next) => {
  res.render('pos', { title: 'POS 목록' });
}));

/** pos 목록 */
router.get('/pos', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountPos');
  var sql_list  = batis9.getQuery('selectListPos');
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
    "total": data[0][0][0].cnt,
    "rows": data[0][1]
  });
}));

/** pos 1건조회 */
router.get('/pos/:posID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailPos', {}) );
  return res.json(data[0]);
}));

/** pos 등록*/
router.post('/pos', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('insertPos', {}) );
  return res.json(SUCESS_MSG);
}));

/** pos 수정 */
router.put('/pos/:posID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('updatePos', {}) );
  return res.json(SUCESS_MSG);
}));

/** pos 삭제 */
router.delete('/pos/:posID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('deletePos', {}) );
  return res.json(SUCESS_MSG);
}));




/***************************************************************************** */
/** 프린터 - easyui grid */
router.get('/printer.pug', asyncHandler(async (req, res, next) => {
  res.render('printer', { title: '프린터설정' });
}));


/** printer 목록 */
router.get('/printer', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountPrinter');
  var sql_list  = batis9.getQuery('selectListPrinter');
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
    "total": data[0][0][0].cnt,
    "rows": data[0][1]
  });
}));

/** printer 1건조회 */
router.get('/printer/:printerID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailPrinter', {}) );
  return res.json(data[0]);
}));

/** printer 등록*/
router.post('/printer', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('insertPrinter', req.body) );
  return res.json(SUCESS_MSG);
}));

/** printer 수정 */
router.put('/printer/:printerID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('updatePrinter', req.body) );
  return res.json(SUCESS_MSG);
}));

/** printer 삭제 */
router.delete('/printer/:printerID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('deletePrinter', req.body) );
  return res.json(SUCESS_MSG);
}));


/***************************************************************************** */
/** 세팅화면 - easyui grid */
router.get('/settings.pug', asyncHandler(async (req, res, next) => {
  res.render('settings', { title: '환경설정' });
}));

/** settings 목록 */
router.get('/settings', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountSettings');
  var sql_list  = batis9.getQuery('selectListSettings');
  try {
    const data = await pool.query(sql_count+";"+sql_list);
    return res.json({
        "total": data[0][0][0].cnt,
        "rows": data[0][1]
    });
  } catch (err) {
    return res.json(fn_error(err));
  }

}));

/** settings 1건조회 */
router.get('/settings/:storeID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailSettings', {}) );
  return res.json(data[0]);
}));

/** settings 등록*/
router.post('/settings', asyncHandler(async (req,res,next) => {
  try {
    await pool.query( batis9.getQuery('insertSettings', req.body) );
    return res.json(SUCESS_MSG);
  } catch(err) {
    return res.json(fn_error(err));
  }
}));

/** settings 수정 */
router.put('/settings/:storeID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('updateSettings', req.body) );
  return res.json(SUCESS_MSG);
}));

/** settings 삭제 */
router.delete('/settings/:storeID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.getQuery('deleteSettings', req.body) );
  return res.json(SUCESS_MSG);
}));


module.exports = router;