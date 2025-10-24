const socketIo= require('socket.io');
const userModel = require('./models/user.model')
const captainModel = require('./models/captain.model');

let io;
function initializedSocket(server) {
       io = socketIo(server,{
        cors:{
            origin: "*",
            methods: ["GET", "POST"]
        }
     });
     
     //when user will connect
     io.on('connection', (socket)=>{
         console.log(`Client connected with socketId: ${socket.id}`);

        
         socket.on('join',async(data)=>{
            const{userType,userId} = data;

            if(userType === 'user'){
                 await userModel.findByIdAndUpdate(userId,{socketId:socket.id});
            }
            else if(userType === 'captain'){
                await captainModel.findByIdAndUpdate(userId,{socketId:socket.id});
            }
         });


        socket.on('update-location-captain',async(data)=>{
             const{userId , location} = data;
             
            //  console.log('update-location-socket');
             if(!userId || !location.ltd || !location.lng){
                return socket.emit('error', { message: 'Invalid location data' });
               }
               
             try{
               const response = await captainModel.findByIdAndUpdate(userId,{
                location:{
                    ltd:location.ltd,
                    lng:location.lng,
                } 
             });
             
             }catch(err){
                 console.log(err); 
             }
          
        });


         socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });

     });      
}

const sendMessageToSocketId = (socketId,messageObject)=>{
        
    console.log(messageObject);
    const{event,data} = messageObject;

   if(io){
      io.to(socketId).emit(event,data);  //data is an boject
   }else{
          console.log('Socket.io not initialized.');
   }
}

module.exports = {initializedSocket,sendMessageToSocketId};
















