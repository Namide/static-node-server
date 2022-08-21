const static = require('node-static');
const http = require('http');

let port = 8000
const staticServer = new(static.Server)(`${__dirname}/public`);
const PROXY_REGEX = /^\/api(.*)$/;
const PROXY_HOSTNAME = 'wikipedia.org';

// Support PhusionPassenger
if (typeof(PhusionPassenger) !== 'undefined') {
  // PhusionPassenger.configure({ autoInstall: false });
  port = 'passenger'
}

http.createServer(function (req, res) {

  // /api proxy
  if (PROXY_REGEX.test(req.url)) {
    // const [,query] = req.url.match(PROXY_REGEX)
    const options = {
      hostname: PROXY_HOSTNAME,
      port: 80,
      path: req.url,
      method: req.method,
      headers: req.headers
    };

    const proxy = http.request(options, function (proxyRes) {
      res.writeHead(proxyRes.statusCode, proxyRes.headers)
      proxyRes.pipe(res, {
        end: true
      });
    });
  
    req.pipe(proxy, {
      end: true
    });

  } else {
    // Static files in /public
    staticServer.serve(req, res);
  }

}).listen(port);
