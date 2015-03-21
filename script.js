(function () {
  console.log('i m here');
  $.ajax({
    url: 'http://localhost:8000/getList',
    type: 'GET',
    success: function() { alert('GET completed'); }
  });
})();