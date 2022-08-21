const static = require('node-static');
const http = require('http');

const file = new(static.Server)(`${__dirname}/public`);

http.createServer(function (req, res) {
  console.log(req)
  file.serve(req, res);
}).listen(8080);
