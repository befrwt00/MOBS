const http = require('http');
const sense = require("sense-hat-led");

const hostname = '192.168.178.106';
const port = 3000;

const server = http.createServer((req, res) => {
  sense.setRotation(0, false);
  sense.showMessage('Received http request.', 0.05, [240, 120, 0], showMessageDone);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World -- with Git!');
});

server.listen(port, hostname, () => {
  const message  = `With Git: Server running at http://${hostname}:${port}/`;
  sense.setRotation(0, false);
  sense.showMessage(message, 0.05, [0, 240, 0], showMessageDone);
  console.log(message);
});

function showMessageDone(){
  console.log("Finished showing message");
  sense.clear();
}
