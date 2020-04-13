
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

    $.postJSON("/store/item", obj, function() {
      console.log('success');
    });
  });


  // 수정
  $('[name="btn2"]').on('click', function() {

    $.putJSON("/store/item/1", obj, function() {
      console.log('success');
    });
  });

    
  // 삭제
  $('[name="btn3"]').on('click', function() {

    $.deleteJSON("/store/item/1", obj, function() {
      console.log('success');
    });

  });

  var template = Handlebars.compile( $("#template").html() );

  $.getJSON(domain + '/store/item','',function(data) {
    let str = '';
    $.each(data.rows, function (indexInArray, valueOfElement) { 
       str += '<tr>';
       str += '  <td>'+ valueOfElement.itemID +'</td>';
       str += '  <td data-itemID='+ valueOfElement.itemID +'><a href="#" onclick="return false;">'+ valueOfElement.itemName +'</a></td>';
       str += '</tr>';
    });
    $('tbody.result').html(str);
    $("#displayDiv").html(template( {"title": "수정폼"} ));
  });

  // itemName clicked 
  $(document).on('click', 'td[data-itemID] > a', (e) => {
    const itemid = e.target.closest('td').getAttribute('data-itemid');
    $.getJSON(domain + '/store/item/'+itemid,{}, (data) => {  
      console.log(data.rows);
      $("#displayDiv").html(template( Object.assign({"title": "수정폼"}, data.rows) ));
    });
    
  });

  // new Template
  $(document).on('click','[name="btnNewTemplate"]', (e) => {
    $("#displayDiv").html(template( {"title": "신규 등록"} ));
  })
});

