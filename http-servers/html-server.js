const http = require('http');
const fs = require('fs');
const path = require('path');
const replace = require('stream-replace');


const server =  http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/html'});
    const filePath = path.join(__dirname, 'index.html');
    fs.createReadStream(filePath)
    .pipe(replace('message', 'New Message'))
    .pipe(response);
});

server.listen(7000);
