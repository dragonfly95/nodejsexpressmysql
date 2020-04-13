$(document).ready(function () {
  
  /*
  $.getJSON('/store/menugroup','',function(data) {
    var str = '';
    $(data.rows).each(function(index,value) {
      str += '<li data-groupid='+ value.groupID
               +' data-storeid='+ value.storeID 
               +' data-menugroup='+ value.menuGroup 
               + ' data-menugroupname="'+ value.menuGroupName
               + '" data-imagefilename="'+ value.imageFileName +'"><input type="button" value="+" style="width:25px;"/><a href="#" onclick="return false;"/> '+value.menuGroupName+'</a></li>';
    })
    document.querySelector('#menu1').innerHTML = str;
  });

  //--  menu group -----------//
  $(document).on('click','#menu1 > li > [type="button"]', function(e) {
    let _target = $(this).closest('li');
    var _groupID_ = _target.data('menugroup');
    var _toggle_ = $(this).val();
    if(_toggle_ === '+') {

      $.getJSON('/store/menu', {'menuGroup': _groupID_}, function(data) {
        var str = '<ul class="menu1">';
        $.each(data.rows, function (indexInArray, valueOfElement) { 
          str += `<li data-menuIdx="${valueOfElement.menuIdx}" data-menuName="${valueOfElement.menuName}" data-menuGroupName="${valueOfElement.menuGroupName}"><a href="#" onclick="return false;"> ${valueOfElement.menuIdx}. ${valueOfElement.menuName} </a></li>`;
        });
        str += '</ul>';
  
        $(_target).find('ul').html('');
        $(_target).append(str);
        str = '';
      });
      //----- end ajax -------------------------------//
      $(this).val('-');
    } else {
      $(_target).find('ul').html('');
      $(this).val('+');
    }

  });
*/


  //--- 하위메뉴 폼에 담기   --//
  $(document).on('click', '#menu1 > li > a', function(e) {
    var _self = $(e.target).closest('li');
    var menugroup     = _self.data('menugroup');
    var menugroupname = _self.data('menugroupname');
    var img_resource = _self.data('imagefilename');
    $('#rightGroup [name="menuGroupName"]').val(menugroupname);
    $('#rightGroup img.resource').attr('src', img_resource );
    $('#rightGroup img.resource').attr('alt', menugroupname );
    $('#rightGroup img.resource').css('width', '370px' );

    groupObj.menuGroup = menugroup;
    groupObj.menuGroupName = menugroupname;
    groupObj.imageFileName = img_resource;
  });

  var groupObj = {
    "menuGroup":0,
    "menuGroupName": "",
    "imageFileName": "",
  }

  var menuObj = {

  }
  
  $(document).on('click','#rightGroup [name="btnFileupload"]', function() {

    var form = $('#rightGroup [name="frm"]')[0];
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
            $('#rightGroup img.resource').attr('src',  aa );
            $('#rightGroup img.resource').attr('alt', result.filename );
            $('#rightGroup img.resource').css('width', '370px' );
  
            alert('이미지 저장되었습니다 ');

            groupObj.imageFileName = aa;
            fn_updateMenuGroup(groupObj);  // 파일저장 db 업데이트 
        }
    });
    //---------- end ajax --------------//
  });

  function fn_updateMenuGroup(obj) {
    $.putJSON('/store/menugroup/2',obj,function(data) {
      console.log('사진정보 저장 완료');
    });
  }




  $(document).on('click','.menu1 > li', function(e) {
    var menuGroupName = $(this).data('menugroupname');
    var menuname = $(this).data('menuname');
    $('#rightMenu [name="menuGroupName"]').val(menuGroupName);
    $('#rightMenu [name="menuName"]').val(menuname);
  });
});


