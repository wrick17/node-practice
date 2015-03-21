(function () {
  console.log('i m here');
  $.get('http://localhost:8000/getContacts', function (data) {
    // console.log(data);
  })
})();