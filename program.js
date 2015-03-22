var http = require('http');
var url = require('url');
var qs = require('querystring');

var list = [
  {'name': 'Pratyush', 'roll': '12'},
  {'name': 'Sayan', 'roll': '34'},
  {'name': 'Abhishek', 'roll': '38'},
  {'name': 'Utsav', 'roll': '43 '}
]

var server = http.createServer(function (request, response) {
  request.setEncoding("UTF-8");

  var parsedUrl = url.parse(request.url);

  console.log('in create server -> ', parsedUrl);
  var parsedUrlPath = parsedUrl.pathname.split('/');

  if (parsedUrlPath[1] === 'contacts' && parsedUrlPath.length < 3 && request.method === 'GET') {
    // response.write(JSON.stringify(list));
    response.writeHead(200, { 'Content-Type': 'application/json' });
    console.log(list);
    response.end(JSON.stringify(list));
  } else if (parsedUrlPath[1] === 'contacts' && parsedUrlPath.length < 3 && request.method === 'POST') {
    var body = '';
    request.on('data', function(data) {
      body += data;
    });
    request.on('end', function() {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      list.push({'name': qs.parse(body).name, 'roll': qs.parse(body).roll});
      console.log(list);
      response.end(JSON.stringify(list));
    });
  } else if (parsedUrlPath[1] === 'contacts' && parsedUrlPath.length === 3 && request.method === 'DELETE') {
    var body = '';
    request.on('data', function(data) {
      body += data;
    });
    request.on('end', function() {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      var index = -1;
      var name = parsedUrlPath[2];
      for (var i = 0; i < list.length; i++) {
        if (list[i].name === name) {
          index = i;
        }
      };
      if (index !== -1) {
        list.splice(index, 1);
      } else {
        console.log('man not found');
      }
      console.log(list);
      response.end(JSON.stringify(list));
    });
  } else if (parsedUrlPath[1] === 'contacts' && parsedUrlPath.length === 3 && request.method === 'PATCH') {
    var body = '';
    request.on('data', function(data) {
      body += data;
    });
    request.on('end', function() {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      var index = -1;
      var name = parsedUrlPath[2];
      var newname = qs.parse(body).newname;
      var newroll = qs.parse(body).roll;
      for (var i = 0; i < list.length; i++) {
        if (list[i].name === name) {
          index = i;
        }
      };
      if (index !== -1) {
        list.splice(index, 1, {'name': newname, 'roll': newroll});
      } else {
        console.log('man not found');
      }
      console.log(list);
      response.end(JSON.stringify(list));
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
