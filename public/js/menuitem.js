(function($){
  loadMenuItem = function(param_menuIdx) {
    $.getJSON(domain + '/store/menuitem',{menuIdx: param_menuIdx},function(data) {
      let str = '';
      $.each(data.rows, function (indexInArray, val) { 
        str += '<li data-itemID='+ val.itemID + '>' + val.itemID + '</li>';
      });
      $('#menuIitem1').html(str);
    });
  }
})(jQuery);

$(document).ready(function () {
  
  $.getJSON(domain + '/store/item','',function(data) {
    let str = '';
    $.each(data.rows, function (indexInArray, valueOfElement) { 
       str += '<tr>';
       str += '  <td>'+ valueOfElement.itemID +'</td>';
       str += '  <td data-itemID='+ valueOfElement.itemID +'><a href="#" onclick="return false;">'+ valueOfElement.itemName +'</a></td>';
       str += '</tr>';
    });
    $('tbody.result').html(str);

    var template2 = Handlebars.compile( $("#template2").html() );
    $("#handlebarArea2").html(template2( data ));

    var template2 = Handlebars.compile( $("#template").html() );
    $("#sample").html(template2( {"boolean":"true"} ));
  });

  //-------------------------------------------//




  $(document).on('click','.menu1 > li', function (e) {
    const menuIdx = $(e.target).closest('li').data('menuidx');
    const menugroup = $(e.target).closest('li').data('menugroup');

    $.getJSON(domain + '/store/menuitem',{menuGroup: menugroup, menuIdx: menuIdx},function(data) {
      let str = '';
      $.each(data.rows, function (indexInArray, valueOfElement) { 
        str += '<li data-itemID='+ valueOfElement.itemID +'>'+ valueOfElement.itemName +'</li>';
      });
      if(data.rows.length == 0) {
        alert('조회결과가 없습니다');
        str = '';
      }
      $('#menuIitem1').html(str);
    });
  });

  //------ #menuIitem1 click
  $(document).on('mouseenter','#menuIitem1 > li', (e) => {
    var itemid = $(e.target).data('itemid');
    $(e.target).css({'background-color':'yellow'});
    $(e.target).append('<input type="button" name="btnRemove" value="'+ itemid +' remove" style="float:right;margin-right:50px;"/>'); 
 });

 $(document).on('mouseleave','#menuIitem1 > li', (e) => {
   $('#menuIitem1 > li').css({'background-color':'white'});
   $('[name="btnRemove"]').remove(); 
 });


});
