$(document).ready(function () {
  
  $.getJSON('/store/modifiergroup','',function(data) {
    var str = '';
    $(data.rows).each(function(index,value) {
      str += '<li data-modifierGroupID='+ value.modifierGroupID 
               + ' data-modifierGroupName="'+ value.modifierGroupName + '"'
               + ' data-maxQty="'+ value.maxQty +'">'
               + '<input type="button" value="+" data-toggle="+" style="width:25px;"/>'
               + '<a href="#" onclick="return false;" data-toggle="+"/> '+value.modifierGroupName+'</a>'
               + '</li>';
    })
    document.querySelector('#modifier1').innerHTML = str;
  });

  //--  menu group -----------//
  $(document).on('click','#modifier1 > li > [type="button"], #modifier1 > li > a', function(e) {
    let _target = $(this).closest('li');
    var _modifierGroupID_ = _target.data('modifiergroupid');
    var _toggle_ = $(this).data('toggle');
    if(_toggle_ === '+') {

      $.getJSON('/store/modifiergroupitem', {'modifierGroupID': _modifierGroupID_}, function(data) {

        var str = '<ul class="modifier1">';
        $.each(data.rows, function (indexInArray, valueOfElement) { 
          str += `<li data-modifierGroupID="${valueOfElement.modifierGroupID}" 
                      data-modifierItemName="${valueOfElement.modifierItemName}" 
                      data-modifierItemID="${valueOfElement.modifierItemID}">
                      <a href="#" onclick="return false;"> ${valueOfElement.modifierItemName} </a>
                  </li>`;
        });
        str += '</ul>';
  
        $(_target).find('ul').html('');
        $(_target).append(str);
        str = '';
      });
      //----- end ajax -------------------------------//
      $(this).val('-');
      $(this).data('toggle','-');
    } else {
      $(_target).find('ul').html('');
      $(this).val('+');
      $(this).data('toggle','+');
    }

  });

  /**
  $(document).on('mouseenter','#modifier1 > li', (e) => {
    $(e.target).append('<input type="button" name="btnAdd" value="add" style="float:right;margin-right:50px;"/>'); 
 });

 $(document).on('mouseleave','#modifier1 > li', (e) => {
   $('[name="btnAdd"]').remove(); 
 });
 */

});


