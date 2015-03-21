var http = require('http');
var url = require('url');

var list = [
  {'name': 'Pratyush', 'id': '1'},
  {'name': 'Sayan', 'id': '3'},
  {'name': 'Abhishek', 'id': '2'},
  {'name': 'Utsav', 'id': '4'}
]

var server = http.createServer(function (request, response) {

  console.log('in create server -> ',url.parse(request.url));

  if (url.parse(request.url).pathname == '/getList' && url.parse(request.url).method == 'GET') {
    // response.write(JSON.stringify(list));
    response.write('returning');
    response.pipe(server);
  }
  else {
    console.log('not found');
  }

});

server.on('connection', function (stream) {
  console.log('someone connected!');
});
server.listen(8000);
// server.listen(process.argv[2]);
