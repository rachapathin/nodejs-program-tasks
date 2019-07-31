const http = require('http');

const server =  http.createServer().on('request', (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.write("Echo Server !");
    request.pipe(response);
});
server.listen(7000);