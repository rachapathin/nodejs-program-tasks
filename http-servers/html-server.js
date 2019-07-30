const http = require('http');
const fs = require('fs');


const server =  http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream(`${process.cwd()}/http-servers/index.html`).pipe(response);
});

server.listen(7000);
