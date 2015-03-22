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

// cant use regex as keys, and if defined as strings we need extra escapting
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

  // always do this last
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

// wait

function editContact(req, res) {
// implement this
}

function removeContact(req, res) {
// implement this
}

// now go

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

  console.log('Handler was:', handler);

  // silly mistake :), was calling the handler only if its POST or PATCH. ouu
// man now tell me what u did
// i lost u in the middle
// calling u
// ok
  req.on('data', function(data) {
    body += data;
  });

  req.on('end', function() {
    req.body = body;
    req.params = params;
    return handler(req, res);
  });

  return;

  // move this into specific methods above
  // we dont need to verify the routes inside those methods again
  // just need the logic of constructing res
  // okk, let me try 2
  // remove code below - wait, first move the logic for edit and delete, okk
  //  first lets see if the above work.s? sure
  // good chance it may not :P :D wait go ahed

  if (parsedUrlPath[1] === 'contacts' && parsedUrlPath.length < 3 && req.method === 'GET') {
    // res.write(JSON.stringify(list));

  } else if (parsedUrlPath[1] === 'contacts' && parsedUrlPath.length < 3 && req.method === 'POST') {
    var body = '';
    req.on('data', function(data) {
      body += data;
    });
    req.on('end', function() {

    });
  } else if (parsedUrlPath[1] === 'contacts' && parsedUrlPath.length === 3 && req.method === 'DELETE') {
    var body = '';
    req.on('data', function(data) {
      body += data;
    });
    req.on('end', function() {
      res.writeHead(200, { 'Content-Type': 'application/json' });
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
      res.end(JSON.stringify(list));
    });
  } else if (parsedUrlPath[1] === 'contacts' && parsedUrlPath.length === 3 && req.method === 'PATCH') {
    var body = '';
    req.on('data', function(data) {
      body += data;
    });
    req.on('end', function() {
      res.writeHead(200, { 'Content-Type': 'application/json' });
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
      res.end(JSON.stringify(list));
    });
  } else {
    console.log('not found');
    res.writeHead(404);
    res.end();
  }

});

server.on('connection', function (stream) {
  console.log('someone connected!');
});
server.listen(8000);
// server.listen(process.argv[2]);
