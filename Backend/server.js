const app = require('./app');
const http = require('http');
const Port = process.env.PORT || 3000;

const {initializedSocket} = require('./socket.io');

const connectDB  = require('./db/db');
connectDB();


const server = http.createServer(app);

initializedSocket(server);

server.listen(Port,()=>{
    console.log(`Server has been started on port ${Port}`);
});
