
var express = require('express');
var router = express.Router();

//   MySQL 로드
var pool = require('./dbutil/mysqlConn');
var batis9 = require("./dbutil/nineBatis");
batis9.loadQuery(__dirname +'/sql', true);

const asyncHandler = require('express-async-handler');

const SUCESS_MSG = {'result': 'SUCCESS'};
const ERROR_MSG = {'result': 'ERROR'};

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



// var dbConfig = {
//     waitForConnections:false,
//     multipleStatements: true
//   };
/**
 * CARDREADER 목록
 */
router.get('/cardreader', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountCardreader');
  var sql_list  = batis9.getQuery('selectListCardreader');
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
      "totalrow": data[0],
      "data": data[1]
  });
}));


/** CARDREADER 1건조회 */
router.get('/cardreader/:groupID/:storeID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailCardreader', {}) );
  return res.json(data[0]);
}));

/** CARDREADER 등록 */
router.post('/cardreader', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('insertCardreader', {}) );
  return res.json(SUCESS_MSG);
}));

/** CARDREADER 수정 */
router.put('/cardreader/:storeID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('updateCardreader', {}) );
  return res.json(SUCESS_MSG);
}));

/** CARDREADER 삭제 */
router.delete('/cardreader/:storeID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('deleteCardreader', {}) );
  return res.json(SUCESS_MSG);
}));





/** deviceset 목록 */
router.get('/deviceset', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountDeviceset');
  var sql_list  = batis9.getQuery('selectListDeviceset');
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
      "totalrow": data[0],
      "data": data[1]
  });
}));

/** deviceset 1건조회 */
router.get('/deviceset/:mainDeviceID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailDeviceset', {}) );
  return res.json(data[0]);
}));

/** deviceset 등록*/
router.post('/deviceset', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('insertDeviceset', {}) );
  return res.json(SUCESS_MSG);
}));

/** deviceset 수정 */
router.put('/deviceset/:mainDeviceID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('updateDeviceset', {}) );
  return res.json(SUCESS_MSG);
}));

/** deviceset 삭제 */
router.delete('/deviceset/:mainDeviceID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('deleteDeviceset', {}) );
  return res.json(SUCESS_MSG);
}));




/** item 목록 */
router.get('/item', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountItem');
  var sql_list  = batis9.getQuery('selectListItem');
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
      "totalrow": data[0],
      "data": data[1]
  });
}));

/** item 1건조회 */
router.get('/item/:itemID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailItem', {}) );
  return res.json(data[0]);
}));

/** item 등록*/
router.post('/item', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('insertItem', {}) );
  return res.json(SUCESS_MSG);
}));

/** item 수정 */
router.put('/item/:itemID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('updateItem', {}) );
  return res.json(SUCESS_MSG);
}));

/** item 삭제 */
router.delete('/item/:itemID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('deleteItem', {}) );
  return res.json(SUCESS_MSG);
}));





/** itemmodifiergroup 목록 */
router.get('/itemmodifiergroup', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountItemmodifiergroup');
  var sql_list  = batis9.getQuery('selectListItemmodifiergroup');
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
      "totalrow": data[0],
      "data": data[1]
  });
}));

/** itemmodifiergroup 1건조회 */
router.get('/itemmodifiergroup/:modifierGroupID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailItemmodifiergroup', {}) );
  return res.json(data[0]);
}));

/** itemmodifiergroup 등록*/
router.post('/itemmodifiergroup', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('insertItemmodifiergroup', {}) );
  return res.json(SUCESS_MSG);
}));

/** itemmodifiergroup 수정 */
router.put('/itemmodifiergroup/:modifierGroupID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('updateItemmodifiergroup', {}) );
  return res.json(SUCESS_MSG);
}));

/** itemmodifiergroup 삭제 */
router.delete('/itemmodifiergroup/:modifierGroupID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('deleteItemmodifiergroup', {}) );
  return res.json(SUCESS_MSG);
}));




/** kiosk 목록 */
router.get('/kiosk', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountKiosk');
  var sql_list  = batis9.getQuery('selectListKiosk');
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
      "totalrow": data[0],
      "data": data[1]
  });
}));

/** kiosk 1건조회 */
router.get('/kiosk/:kioskID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailKiosk', {}) );
  return res.json(data[0]);
}));

/** kiosk 등록*/
router.post('/kiosk', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('insertKiosk', {}) );
  return res.json(SUCESS_MSG);
}));

/** kiosk 수정 */
router.put('/kiosk/:kioskID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('updateKiosk', {}) );
  return res.json(SUCESS_MSG);
}));

/** kiosk 삭제 */
router.delete('/kiosk/:kioskID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('deleteKiosk', {}) );
  return res.json(SUCESS_MSG);
}));





/** menu 목록 */
router.get('/menu', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountMenu');
  var sql_list  = batis9.getQuery('selectListMenu');
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
      "totalrow": data[0],
      "data": data[1]
  });
}));

/** menu 1건조회 */
router.get('/menu/:menuID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailMenu', {}) );
  return res.json(data[0]);
}));

/** menu 등록*/
router.post('/menu', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('insertMenu', {}) );
  return res.json(SUCESS_MSG);
}));

/** menu 수정 */
router.put('/menu/:menuID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('updateMenu', {}) );
  return res.json(SUCESS_MSG);
}));

/** menu 삭제 */
router.delete('/menu/:menuID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('deleteMenu', {}) );
  return res.json(SUCESS_MSG);
}));




/** menugroup 목록 */
router.get('/menugroup', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountMenugroup');
  var sql_list  = batis9.getQuery('selectListMenugroup');
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
      "totalrow": data[0],
      "data": data[1]
  });
}));

/** menugroup 1건조회 */
router.get('/menugroup/:menugroupID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailMenugroup', {}) );
  return res.json(data[0]);
}));

/** menugroup 등록*/
router.post('/menugroup', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('insertMenugroup', {}) );
  return res.json(SUCESS_MSG);
}));

/** menugroup 수정 */
router.put('/menugroup/:menugroupID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('updateMenugroup', {}) );
  return res.json(SUCESS_MSG);
}));

/** menugroup 삭제 */
router.delete('/menugroup/:menugroupID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('deleteMenugroup', {}) );
  return res.json(SUCESS_MSG);
}));





/** menuitem 목록 */
router.get('/menuitem', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountMenuitem');
  var sql_list  = batis9.getQuery('selectListMenuitem');
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
      "totalrow": data[0],
      "data": data[1]
  });
}));

/** menuitem 1건조회 */
router.get('/menuitem/:menuitemID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailMenuitem', {}) );
  return res.json(data[0]);
}));

/** menuitem 등록*/
router.post('/menuitem', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('insertMenuitem', {}) );
  return res.json(SUCESS_MSG);
}));

/** menuitem 수정 */
router.put('/menuitem/:menuitemID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('updateMenuitem', {}) );
  return res.json(SUCESS_MSG);
}));

/** menuitem 삭제 */
router.delete('/menuitem/:menuitemID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('deleteMenuitem', {}) );
  return res.json(SUCESS_MSG);
}));






/** modifiergroup 목록 */
router.get('/modifiergroup', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountModifiergroup');
  var sql_list  = batis9.getQuery('selectListModifiergroup');
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
      "totalrow": data[0],
      "data": data[1]
  });
}));

/** modifiergroup 1건조회 */
router.get('/modifiergroup/:modifiergroupID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailModifiergroup', {}) );
  return res.json(data[0]);
}));

/** modifiergroup 등록*/
router.post('/modifiergroup', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('insertModifiergroup', {}) );
  return res.json(SUCESS_MSG);
}));

/** modifiergroup 수정 */
router.put('/modifiergroup/:modifiergroupID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('updateModifiergroup', {}) );
  return res.json(SUCESS_MSG);
}));

/** modifiergroup 삭제 */
router.delete('/modifiergroup/:modifiergroupID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('deleteModifiergroup', {}) );
  return res.json(SUCESS_MSG);
}));






/** modifiergroupitem 목록 */
router.get('/modifiergroupitem', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountModifiergroupitem');
  var sql_list  = batis9.getQuery('selectListModifiergroupitem');
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
      "totalrow": data[0],
      "data": data[1]
  });

}));

/** modifiergroupitem 1건조회 */
router.get('/modifiergroupitem/:modifiergroupitemID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailModifiergroupitem', {}) );
  return res.json(data[0]);
}));

/** modifiergroupitem 등록*/
router.post('/modifiergroupitem', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('insertModifiergroupitem', {}) );
  return res.json(SUCESS_MSG);
}));

/** modifiergroupitem 수정 */
router.put('/modifiergroupitem/:modifiergroupitemID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('updateModifiergroupitem', {}) );
  return res.json(SUCESS_MSG);
}));

/** modifiergroupitem 삭제 */
router.delete('/modifiergroupitem/:modifiergroupitemID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('deleteModifiergroupitem', {}) );
  return res.json(SUCESS_MSG);
}));





/** modifieritem 목록 */
router.get('/modifieritem', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountModifieritem');
  var sql_list  = batis9.getQuery('selectListModifieritem');
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
      "totalrow": data[0],
      "data": data[1]
  });
}));

/** modifieritem 1건조회 */
router.get('/modifieritem/:modifieritemID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailModifieritem', {}) );
  return res.json(data[0]);
}));

/** modifieritem 등록*/
router.post('/modifieritem', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('insertModifieritem', {}) );
  return res.json(SUCESS_MSG);
}));

/** modifieritem 수정 */
router.put('/modifieritem/:modifieritemID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('updateModifieritem', {}) );
  return res.json(SUCESS_MSG);
}));

/** modifieritem 삭제 */
router.delete('/modifieritem/:modifieritemID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('deleteModifieritem', {}) );
  return res.json(SUCESS_MSG);
}));







/** pos 목록 */
router.get('/pos', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountPos');
  var sql_list  = batis9.getQuery('selectListPos');
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
      "totalrow": data[0],
      "data": data[1]
  });
}));

/** pos 1건조회 */
router.get('/pos/:posID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailPos', {}) );
  return res.json(data[0]);
}));

/** pos 등록*/
router.post('/pos', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('insertPos', {}) );
  return res.json(SUCESS_MSG);
}));

/** pos 수정 */
router.put('/pos/:posID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('updatePos', {}) );
  return res.json(SUCESS_MSG);
}));

/** pos 삭제 */
router.delete('/pos/:posID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('deletePos', {}) );
  return res.json(SUCESS_MSG);
}));









/** printer 목록 */
router.get('/printer', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountPrinter');
  var sql_list  = batis9.getQuery('selectListPrinter');
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
      "totalrow": data[0],
      "data": data[1]
  });
}));

/** printer 1건조회 */
router.get('/printer/:printerID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailPrinter', {}) );
  return res.json(data[0]);
}));

/** printer 등록*/
router.printert('/printer', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('insertPrinter', {}) );
  return res.json(SUCESS_MSG);
}));

/** printer 수정 */
router.put('/printer/:printerID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('updatePrinter', {}) );
  return res.json(SUCESS_MSG);
}));

/** printer 삭제 */
router.delete('/printer/:printerID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('deletePrinter', {}) );
  return res.json(SUCESS_MSG);
}));






/** settings 목록 */
router.get('/settings', asyncHandler(async (req,res,next) => {
  var sql_count = batis9.getQuery('selectCountSettings');
  var sql_list  = batis9.getQuery('selectListSettings');
  const data = await pool.query(sql_count+";"+sql_list);
  return res.json({
      "totalrow": data[0],
      "data": data[1]
  });
}));

/** settings 1건조회 */
router.get('/settings/:storeID', asyncHandler(async (req,res,next) => {
  const data = await pool.query( batis9.getQuery('selectDetailSettings', {}) );
  return res.json(data[0]);
}));

/** settings 등록*/
router.settingst('/settings', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('insertSettings', {}) );
  return res.json(SUCESS_MSG);
}));

/** settings 수정 */
router.put('/settings/:storeID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('updateSettings', {}) );
  return res.json(SUCESS_MSG);
}));

/** settings 삭제 */
router.delete('/settings/:storeID', asyncHandler(async (req,res,next) => {
  await pool.query( batis9.query('deleteSettings', {}) );
  return res.json(SUCESS_MSG);
}));



module.exports = router;
