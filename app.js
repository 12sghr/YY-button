const http = require("http");
const html = require('fs').readFileSync('YY_button.html');
const server = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(html);
});
server.listen(process.env.PORT || 8080);

// const http = require("http");
// const fs    = require('fs');
// const iconv = require('iconv-lite');
// let retStr;
//
// fs.readFile('YY_button.html', (err, data) => {
//   if (err) throw err;
//   const buf    = new Buffer(data, 'binary');
//   retStr = iconv.decode(buf, "Shift_JIS");
// });
//
// const server = http.createServer((request, response) => {
//     response.writeHead(200, {'Content-Type': 'text/html'});
//     response.end(retStr);
// });
// server.listen(process.env.PORT || 8080);
