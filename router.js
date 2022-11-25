const http = require('http');
const sense = require('sense-hat-led');
const fs = require('fs/promises');

const hostname = '192.168.1.61';
const port = 3000;

function flashIndicator() {

    sense.setPixel(0, 0, [40, 140, 40]);
    setTimeout(() => sense.clear(), 100);
}

const server = http.createServer(async (req, res) => {

    console.log('Request:', req.method, req.url);
    flashIndicator();

    const route = req.url.replace(/^\/|\/$/g, '')

    switch (route) {

        case '':
        case 'shell':

            const appShellHtml = await fs.readFile('static/shell.html');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.write(appShellHtml);
            res.end();
            break;

        case 'ice/vanilla':

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Vanilleeis!');
            break;

        case 'ice/strawberry':

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Erdbeereis!');
            break;

        default:

            res.statusCode = 403;
            res.end();
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
