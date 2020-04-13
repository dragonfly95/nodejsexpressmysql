

jQuery["getJSON"] = function( url, data, callback ) {
  if ( jQuery.isFunction( data ) ) {
      callback = data;
      data = undefined;
  }

  return jQuery.ajax({
      url: url,
      data: data,
      success: callback
  });
};



jQuery["postJSON"] = function( url, data, callback ) {
  if ( jQuery.isFunction( data ) ) {
      callback = data;
      data = undefined;
  }

  return jQuery.ajax({
      url: url,
      type: "POST",
      contentType:"application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(data),
      success: callback,
      error: function (response) {
        console.log('error');
        alert('등록시 오류발생');
      }
  });
};


//
// var domain = 'http://localhost:3000';
var domain = '';


jQuery["putJSON"] = function( url, data, callback ) {
  if ( jQuery.isFunction( data ) ) {
      callback = data;
      data = undefined;
  }

  return jQuery.ajax({
      url: url,
      type: "PUT",
      contentType:"application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(data),
      success: callback,
      error: function (response) {
        console.log('error');
        alert('수정시 오류발생');
      }
  });
};




jQuery["deleteJSON"] = function( url, data, callback ) {
  if ( jQuery.isFunction( data ) ) {
      callback = data;
      data = undefined;
  }

  return jQuery.ajax({
      url: url,
      type: "DELETE",
      contentType:"application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(data),
      success: callback,
      error: function (response) {
        console.log('error');
        alert('삭제시 오류발생');
      }
  });
};

  // 개발이후 지울 것
function menuClick_dev(URL, menuNm){
  location.href=URL;
}
  // 개발이후 지울 것