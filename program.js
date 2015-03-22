var http = require('http');
var url = require('url');
var qs = require('querystring');

var lastId = 5;
var list = [
  {name: 'Pratyush', id: 1},
  {name: 'Sayan', id: 2},
  {name: 'Abhishek', id: 3},
  {name: 'Utsav', id: 4}
];

Array.prototype.find = function (predicate) {
  for (var item in this) {
    if (!this.hasOwnProperty(item)) continue;

    if (predicate(this[item])) return this[item];
  }
};

var routes = {
  'GET /contacts$': listContacts,
  'POST /contacts$': addContact,
  'GET /contacts/(\\d+)$': getContact,
  'PATCH /contacts/(\\d+)$': editContact,
  'DELETE /contacts/(\\d+)$': removeContact
};

function listContacts(req, res) {
  console.log(list);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(list));
}

function addContact(req, res) {
  var entry = JSON.parse(req.body);
  entry.id = lastId++;

  list.push(entry);
  console.log(list);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(list));
}

function getContact(req, res) {
  var id = parseInt(req.params[0]);
      entry = list.find(function (contact) {
        return contact.id === id;
      });

  if (!entry) {
    res.writeHead(404);
    res.end();
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(entry));
}

function editContact(req, res) {
  var id = parseInt(req.params[0]);
  var entry = JSON.parse(req.body);

  list.splice(id-1, 1, {'name': entry.name, 'id': id});
  console.log(list);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(list));
}

function removeContact(req, res) {
  var id = parseInt(req.params[0]);

  list.splice(id-1, 1);
  console.log(list);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(list));
}

var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url),
      methodAndPath = req.method + ' ' + parsedUrl.pathname,
      routePat, routeRex, match, handler, params, body = '';

  console.log('in create server -> ', methodAndPath); // wait

  for (routePat in routes) {
    if (!routes.hasOwnProperty(routePat)) continue;

    routeRex = new RegExp(routePat),
    match = routeRex.exec(methodAndPath);

    console.log('Matching with:', routePat, 'result - ', !!match);

    if (!match) continue;

    handler = routes[routePat];
    params = match.slice(1);

    break;
  }

  if (!handler) {
    res.writeHead(404);
    res.end();
    return;
  }

  req.on('data', function(data) {
    body += data;
  });

  req.on('end', function() {
    req.body = body;
    req.params = params;
    return handler(req, res);
  });

  return;
});

server.on('connection', function (stream) {
  console.log('someone connected!');
});
server.listen(8000);
// server.listen(process.argv[2]);
