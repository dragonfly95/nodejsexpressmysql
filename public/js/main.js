
$(window).resize(function(){
  resize_iframe();
});

function resize_iframe(e)
{
  if(typeof(e) == 'object')
  {
      var _contentHeight = 600;
      $(e).width("100%");
      $(e).height(_contentHeight);

      setTimeout(function(){
          _contentHeight = $(e).contents().find("body").prop("scrollHeight");
          $(e).contents().find('#menu').remove();
          $(e).height(_contentHeight + 1550);
      },500);
  }
}



function menuClick(URL, menuNm){
  
  parent.$('#content').hide();
  var appendFrmTo = parent.$('#targetFrmDiv');
  var appendNavTo = parent.$('#menuTab');
  
  //열려있는 창의 개수 7개까지만 오픈됩니다
  if($(appendFrmTo).children('iframe').length > 6){
      alert("페이지는 7개까지만 오픈됩니다.");
      return;
  }

  $(appendNavTo).children('div').css('background-color','#eaeaea');
  $(appendNavTo).children('div').css('font-weight','');
  $(appendFrmTo).children('iframe').hide();
  
  var isAleadyOpen = false;
  for(var i=0; i<$(appendFrmTo).children('iframe').length; i++){
      var tmpFrm = $(appendFrmTo).children('iframe').eq(i);
      var tmpNav = $(appendNavTo).children('div').eq(i);
      if($(tmpFrm).attr('src') == URL){
          menuRestore(URL, menuNm)
          isAleadyOpen = true;
      }
  }
  
  if(!isAleadyOpen){
      
      var tmpFrm = $('#orgFrmDiv').children().first().clone().appendTo(appendFrmTo);
      var tmpNav = $('#orgNavDiv').children().clone().appendTo(appendNavTo);
      $(tmpNav).first().text(menuNm);
      $(tmpNav).first().css('font-weight','bold');
      $(tmpNav).first().attr("onclick", "menuRestore('"+URL+"', '"+menuNm+"')");
      $(tmpNav).first().next().attr("onclick", "menuClose('"+URL+"', '"+menuNm+"')");
      $(tmpFrm).attr("src",URL);
      $(tmpFrm).parent().show();  
      resize_iframe(tmpFrm);  
  }

}

function menuRestore(URL, menuNm){
  var appendFrmTo = parent.$('#targetFrmDiv');
  var appendNavTo = parent.$('#menuTab');
  
  $(appendFrmTo).children('iframe').hide();
  $(appendNavTo).children('div').css('background-color','#eaeaea');
  $(appendNavTo).children('div').css('font-weight','');
  
  for(var i=0; i<$(appendFrmTo).children('iframe').length; i++){
      var tmpFrm = $(appendFrmTo).children('iframe').eq(i);
      var tmpNav = $(appendNavTo).children('div').eq(i);
      if($(tmpFrm).attr('src') == URL){
          $(tmpFrm).show();
          resize_iframe(tmpFrm);
          $(tmpNav).css('background-color','#ffffff');
          $(tmpNav).css('font-weight','bold');
      }
  }
}

function menuClose(URL, menuNm){
  var appendFrmTo = parent.$('#targetFrmDiv');
  var appendNavTo = parent.$('#menuTab'); 
  
  for(var i=0; i<$(appendFrmTo).children('iframe').length; i++){
      var tmpFrm = $(appendFrmTo).children('iframe').eq(i);
      var tmpNav = $(appendNavTo).children('div').eq(i);
      if($(tmpFrm).attr('src') == URL){
          $(tmpFrm).remove();
          $(tmpNav).next().remove();
          $(tmpNav).remove();
      }
  }
  var curTabClosed = true;
  var isEmpty = false;
  for(var i=0; i<$(appendFrmTo).children('iframe').length; i++){
      var tmpFrm = $(appendFrmTo).children('iframe').eq(i);
      if($(tmpFrm).css('display') == "" || $(tmpFrm).css('display') == "inline"){
          curTabClosed = false;
      }
  }
  if($(appendFrmTo).children('iframe').length == 0)
      isEmpty = true;
  
  if(curTabClosed && !isEmpty){
      var tmpFrm = $(appendFrmTo).children('iframe').eq(0);
      var tmpNav = $(appendNavTo).children('div').eq(0);
      $(tmpFrm).show();
      resize_iframe(tmpFrm);
      $(tmpNav).css('background-color','#ffffff');
      $(tmpNav).css('font-weight','bold');
  }
  if(isEmpty){
      parent.$('#content').show();
  }
}


//---------------------- docready ------//
(function(){

  //-- init menu --//
  $('.pure-menu-list2').hide();

  $('.menu-list-title').on('click', function(e) {
    $('.pure-menu-list2').hide();
    var tab = $(e.target).data('tab');
    $('#tab'+tab).show('fast');
  });
})();
