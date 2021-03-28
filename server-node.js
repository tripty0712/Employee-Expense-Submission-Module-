const http = require("http");
// import http from 'http';

const server = http.createServer((req, res) => {
  res.end("Hello everyone!!!");
});

server.listen(4500, () => {
  console.log("Running server on port 4500");
});
