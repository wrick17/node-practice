var fs = require('fs');
var path = require('path');

exports.getList = function (dir, ext, callback) {
  var str = fs.readdir(dir, function (err, list) {
    var count = 0;
    var result = [];
    if (err)
      return callback(err, result);
    for (var i = 0; i < list.length; i++) {
      if (path.extname(list[i]) == '.'+ext) {
        count++;
        result.push(list[i]);
      }
    };
    // console.log(result);
    callback(err, result);
  });
}