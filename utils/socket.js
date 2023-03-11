// const {getUsers, users} = require('./getUsers');
const {newUser,getActiveUser,exitRoom,getIndividualRoomUsers} = require('./userHepler')



var p =0;

function socket(io){
    
    io.on('connection',(socket)=>{
        console.log(' %s sockets connected', io.engine.clientsCount);
        
        socket.on('joined-user', (data) =>{
            const room= data.roomname;
            //Storing users connected in a room in memory
            const user = newUser(socket.id, data.username,data.roomname);

    
            //Joining the Socket Room
            socket.join(room);

            // Emitting New Username to Clients
            // io.to(data.roomname).emit('joined-user', {username: data.username});
            io.to(room).emit('joined-user', {username: data.username});

            //Send online users array
            io.to(room).emit('online-users', {users:getIndividualRoomUsers(room)});
 
        })

        socket.on('typing', (data) =>{
            io.to(data.roomname).emit('typing', {username: data.username})

        })

        socket.on('stop-typing', (data) =>{

        })

        socket.on('disconnect', (data) =>{
            const user = exitRoom(socket.id);
            console.log(' %s sockets disconnected '+socket.id, io.engine.clientsCount);
          
            
            io.to(data.roomname).emit('joined-user', {username: data.username});
            io.to(data.roomname).emit('online-users', {
                users: getIndividualRoomUsers(data.roomname)
            });
            // io.to(room1).emit('disconnected', {username: data.username});
        })

        // socket.on('send-message', (msg,name) =>{
        //     var str = 
        // })

        // socket.on('send-image', (data) =>{})
        // socket.on('send-video', (data) =>{})
        // socket.on('send-audio', (data) =>{})
        // socket.on('send-file', (data) =>{})
        // socket.on('send-location', (data) =>{})
        // socket.on('send-sticker', (data) =>{})
        // socket.on('send-contact', (data) =>{})
        // socket.on('send-video-call', (data) =>{})
        // socket.on('send-audio-call', (data) =>{})
        // socket.on('send-file-call', (data) =>{})
        // socket.on('send-location-call', (data) =>{})
        // socket.on('send-sticker-call', (data) =>{})
        // socket.on('send-contact-call', (data) =>{})
         
        

        
        
    })
}


module.exports = socket;



