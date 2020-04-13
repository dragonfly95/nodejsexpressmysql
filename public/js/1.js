
$(document).ready(function () {

  
  var obj = JSON.stringify({
      "groupID":99999
    ,"storeID":555
    ,"cardReaderID": "#204"
    , "IP": "123.456.789.0"
    , "Active": 1
    , "onoff": 1
  });


  // 등록 
  $('[name="btn1"]').on('click', function() {

    $.ajax({
      type: "post",
      url: "/store/cardreader",
      data: obj,
      contentType: "application/json",
      success: function (response) {
        console.log('success');
      },
      error: function (response) {
        console.log('error');
      }
    });
  });


  // 수정
  $('[name="btn2"]').on('click', function() {

    $.ajax({
      type: "put",
      url: "/store/cardreader/1",
      data: obj,
      contentType: "application/json",
      success: function (response) {
        console.log('success');
      },
      error: function (response) {
        console.log('error');
      }
    });
  });

    
  // 삭제
  $('[name="btn3"]').on('click', function() {

    $.ajax({
      type: "delete",
      url: "/store/cardreader/1",
      data: obj,
      contentType: "application/json",
      success: function (response) {
        console.log('success');
      },
      error: function (response) {
        console.log('error');
      }
    });

  });



});