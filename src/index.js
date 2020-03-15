var restify = require('restify');

import routes from './routes/routes';


const server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

routes(server);

server.listen(8000, () => {
  console.log("Server listening on port 8000");
});
