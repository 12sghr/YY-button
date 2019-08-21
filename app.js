const http = require("http");
const html = require('fs').readFileSync('YY_button.html');
const server = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(html);
});
server.listen(process.env.PORT || 8080);
