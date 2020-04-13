$(document).ready(function () {
  
  $.getJSON('/store/menugroup','',function(data) {
    var str = '';
    $(data.rows).each(function(index,value) {
      str += '<li data-groupid='+ value.groupID
             +' data-storeid='+ value.storeID 
             +' data-menugroup='+ value.menuGroup 
             +' data-menugroupname="'+ value.menuGroupName+'" '
             +' data-imagefilename="'+ value.imageFileName +'">'
             + '<a href="#" onclick="return false;">' + value.menuGroupName+'</a></li>';
    })
    document.querySelector('#group1').innerHTML = str;
  });


  $(document).on('click', '#group1 > li > a', function(e) {
    var _self = $(e.target).closest('li');
    var menugroup     = _self.data('menugroup');
    var menugroupname = _self.data('menugroupname');
    var img_resource = _self.data('imagefilename');
    $('[name="menuGroupName"]').val(menugroupname);
    $('img.resource').attr('src', img_resource );
    $('img.resource').attr('alt', menugroupname );

    formObj.menuGroup = menugroup;
    formObj.menuGroupName = menugroupname;
    formObj.imageFileName = img_resource;
  });

  var formObj = {
    "menuGroup":0,
    "menuGroupName": "",
    "imageFileName": "",
  }

  $(document).on('click','[name="btnFileupload"]', function() {

    var form = $('[name="frm"]')[0];
    var formData = new FormData(form);
  
    $.ajax({
        url: '/up',
        processData: false,
        contentType: false,
        data: formData,
        type: 'POST',
        success: function(result){
          var origin = result.destination + result.filename;
          var aa = origin.replace('public','');
            $('img.resource').attr('src',  aa );
            $('img.resource').attr('alt', result.filename );
  
            alert('이미지 저장되었습니다 ');

            formObj.imageFileName = aa;
            fn_updateMenuGroup(formObj);  // 파일저장 db 업데이트 
        }
    });
    //---------- end ajax --------------//
  });

  function fn_updateMenuGroup(obj) {
    $.putJSON('/store/menugroup/2',obj,function(data) {
      debugger
    });
  }

});


