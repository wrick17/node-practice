var http = require('http');
var url = require('url');
var qs = require('querystring');

var list = [
  {'name': 'Pratyush', 'id': '1'},
  {'name': 'Sayan', 'id': '2'},
  {'name': 'Abhishek', 'id': '3'},
  {'name': 'Utsav', 'id': '4'}
]

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url);

  console.log('in create server -> ', parsedUrl.pathname);

  if (parsedUrl.pathname === '/getContacts' && request.method === 'GET') {
    // response.write(JSON.stringify(list));
    response.writeHead(200, { 'Content-Type': 'application/json' });
    console.log(list);
    response.end();
  } else if (parsedUrl.pathname === '/addContact' && request.method === 'POST') {
    var body = '';
    request.on('data', function(data) {
      body += data;
    });
    request.on('end', function() {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      list.push({'name': qs.parse(body).name, 'id': list.length+1});
      console.log(list);
      response.end();
    });
  } else if (parsedUrl.pathname === '/deleteContact' && request.method === 'POST') {
    var body = '';
    request.on('data', function(data) {
      body += data;
    });
    request.on('end', function() {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      var index = -1;
      var name = qs.parse(body).name;
      for (var i = 0; i < list.length; i++) {
        if (list[i].name == qs.parse(body).name) {
          console.log(list[i].name == name);
          index = i;
        }
      };
      if (index !== -1) {
        list.splice(index, 1);
      } else {
        console.log('man not found');
      }
      console.log(list);
      response.end();
    });
  } else if (parsedUrl.pathname === '/editContact' && request.method === 'POST') {
    var body = '';
    request.on('data', function(data) {
      body += data;
    });
    request.on('end', function() {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      var index = -1;
      var name = qs.parse(body).name;
      var newname = qs.parse(body).newname;
      console.log(name, newname);
      for (var i = 0; i < list.length; i++) {
        if (list[i].name === name) {
          console.log(list[i].name, name);
          console.log(list[i].name === name);
          index = i;
        }
      };
      if (index !== -1) {
        console.log(index);
        list.splice(index, 1, {'name': newname, 'id': index+1});
      } else {
        console.log('man not found');
      }
      console.log(list);
      response.end();
    });
  } else {
    console.log('not found');
    response.writeHead(404);
    response.end();
  }

});

server.on('connection', function (stream) {
  console.log('someone connected!');
});
server.listen(8000);
// server.listen(process.argv[2]);
