
$(document).ready(function () {
  
  var obj = JSON.stringify({
            "groupID": 99999,
            "storeID": 556,
            "printerID": "112",
            "printerType": "123-456-7890",
            "IP": "127.0.0.1"
          });

  // 등록 
  $('[name="btn1"]').on('click', function() {

    $.ajax({
      type: "post",
      url: "/store/printer",
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
      url: "/store/printer/1",
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
      url: "/store/printer/1",
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

