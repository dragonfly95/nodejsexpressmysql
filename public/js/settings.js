var printer = function() {

  return {
    getOne: function() {
      return '1';
    },
    getTwo: function() {
      return '2';
    }
  }
}();

var settings = function() {

  return {
    getOne: function() {
      return '1';
    },
    getTwo: function() {
      return '2';
    }
  }
}();


$(document).ready(function () {
  
  var obj = JSON.stringify({
            "groupID": 99999,
            "storeID": 556,
            "StoreName": "W&B",
            "StorePhone": "123-456-7890",
            "Addr1": "9001 Braddock Rd",
            "Addr2": "",
            "City": "Springfield",
            "State": "VA",
            "ZipCode": "22151",
            "DisplayMode": 5,
            "Tax1": "3.500",
            "Tax2": "2.500",
            "Tax3": "1.500",
            "Tax4": "1.300"
          });


  // 등록 
  $('[name="btn1"]').on('click', function() {

    $.ajax({
      type: "post",
      url: "/store/settings",
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
      url: "/store/settings/1",
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
      url: "/store/settings/1",
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


var editIndex = undefined;
function endEditing(){
    if (editIndex == undefined){return true}
    if ($('#dg').datagrid('validateRow', editIndex)){
        $('#dg').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}

function onClickCell(index, field){
  if (editIndex != index){
      if (endEditing()){
          $('#dg').datagrid('selectRow', index)
                  .datagrid('beginEdit', index);
          var ed = $('#dg').datagrid('getEditor', {index:index,field:field});
          if (ed){
              ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
          }
          editIndex = index;
      } else {
          setTimeout(function(){
              $('#dg').datagrid('selectRow', editIndex);
          },0);
      }
  }
}

function onEndEdit(index, row){
  var ed = $(this).datagrid('getEditor', {
      index: index,
      field: 'storeID'
  });
}
function append(){
  if (endEditing()){
      $('#dg').datagrid('appendRow',{status:'P'});
      editIndex = $('#dg').datagrid('getRows').length-1;
      $('#dg').datagrid('selectRow', editIndex)
              .datagrid('beginEdit', editIndex);
  }
}
function removeit(){
  if (editIndex == undefined){return}
  $('#dg').datagrid('cancelEdit', editIndex)
          .datagrid('deleteRow', editIndex);
  editIndex = undefined;
}
function acceptit(){
  if (endEditing()){
      $('#dg').datagrid('acceptChanges');
      var data = $('#dg').datagrid('getSelected');
      alert('저장하기');
  }
}
function reject(){
  $('#dg').datagrid('rejectChanges');
  editIndex = undefined;
}
function getChanges(){
  var rows = $('#dg').datagrid('getChanges');
  alert(rows.length+' rows are changed!');
}