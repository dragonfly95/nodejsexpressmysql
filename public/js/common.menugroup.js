$(document).ready(function () {

  $.getJSON('/store/menugroup','',function(data) {
    var str = '';
    $(data.rows).each(function(index,value) {
      str += '<li data-groupid='+ value.groupID
               +' data-storeid='+ value.storeID 
               +' data-menugroup='+ value.menuGroup 
               +' data-menugroupname="'+ value.menuGroupName+ '" '
               +' data-imagefilename="'+ value.imageFileName +'">'
               +'<input type="button" value="+" style="width:25px;"/>'
               +'<a href="#" onclick="return false;"/> '+value.menuGroupName+' ('+ value.cnt +') </a>'
               +'</li>';
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
          str += '<li data-menugroup=' + valueOfElement.menuGroup 
                   +' data-menuIdx=' + valueOfElement.menuIdx 
                   +' data-menuName="' + valueOfElement.menuName + '" ' 
                   +' data-menuGroupName="' + valueOfElement.menuGroupName + '">'
                   +' <a href="#" onclick="return false;"> ' + valueOfElement.menuIdx + '.' + valueOfElement.menuName + ' ('+ valueOfElement.cnt +') </a>'
                   +'</li>';
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
});  // end docReady