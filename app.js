const http= require('http');

const routes=require('./routes');

const server= http.createServer(routes);

server.listen(3000); //3000 is port no.