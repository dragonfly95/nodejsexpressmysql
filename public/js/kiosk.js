
$(document).ready(function () {
  
  var obj = {
              "groupID" : 99999,
              "storeID" : 555,
              "itemID" : 1229,
              "itemName" : 'LARGE FRIES',
              "itemName2" : 'LARGE FRIES',
              "description" : '',
              "price" : 2.99,
              "rateDiscount" : 2.99,
              "imagefilename" : '',
              "tax1" : 1.000,
              "tax2" : 1.000,
              "tax3" : 1.000,
              "tax4" : 0.000,
              "togoPrice" : 0.00,
              "ageCheck" : 0,
              "ageLimit" : 0,
              "Active" : 0,
              "createDate" : '2020-03-24 10:55:13',
              "updateDate" : '2020-03-24 10:55:13'
          };

  // 등록 
  $('[name="btn1"]').on('click', function() {

    $.postJSON("/store/kiosk", obj, function() {
      console.log('success');
    });
  });


  // 수정
  $('[name="btn2"]').on('click', function() {

    $.putJSON("/store/kiosk/1", obj, function() {
      console.log('success');
    });
  });

    
  // 삭제
  $('[name="btn3"]').on('click', function() {

    $.deleteJSON("/store/kiosk/1", obj, function() {
      console.log('success');
    });

  });


  $('#dg').datagrid({
    onSelect: function(index,row) {
      $('#myModal').modal();
    }
  }); // datagrid

});
