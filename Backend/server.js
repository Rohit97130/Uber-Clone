const app = require('./app');
const http = require('http');
const Port = process.env.PORT || 3000;



const server = http.createServer(app);


server.listen(Port,()=>{
    console.log(`Server has been started on port ${Port}`);
});
