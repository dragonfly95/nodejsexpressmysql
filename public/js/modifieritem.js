$(document).ready(function () {

  var objList = [];
  var template = Handlebars.compile( $("#template").html() );

  /** modifier item */
  $.getJSON(domain + '/store/modifieritem','',function(data) {
    objList = data.rows;

    let str = '';
    $.each(objList, function (indexInArray, valueOfElement) { 
       str += '<li data-modifierItemID='+ valueOfElement.modifierItemID +'>'
           + '<a href="#" onclick="return false;">'
           +   valueOfElement.modifierItemID +'. ' 
           +   valueOfElement.ModifierItemName +'/ ' 
           +   valueOfElement.ModifierItemPrice
           + '</a></li>';
    });
    if(objList.length == 0) {
      str = '';
      alert('조회 내용이 없습니다');
    }
    $("#displayDiv").html(template( {"title": "수정폼"} ));
    $('#modifieritem1').html(str);
  });

  $(document).on('click', 'li[data-modifierItemID] > a', function(e) {
    var modifierItemID = $(e.target).closest('li').data('modifieritemid');
    $.each(objList, function (indexInArray, valueOfElement) { 
      if(valueOfElement.modifierItemID = modifierItemID) {
        $("#displayDiv").html(template( Object.assign({"title": "수정폼"}, valueOfElement) ));
      }
   });
  });
});