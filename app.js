// const http = require("http");
// const html = require('fs').readFileSync('YY_button.html');
// const server = http.createServer((request, response) => {
//     response.writeHead(200, {'Content-Type': 'text/html'});
//     response.end(html);
// });
// server.listen(process.env.PORT || 8080);

const express = require("express");
const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));

const server = app.listen(process.env.PORT || 8080, () => {
    console.log("Node.js is listening to PORT:" + server.address().port);
});

app.get("/", (req, res) => {
  res.render("YY_button");
  return;
});
