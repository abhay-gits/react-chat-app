let count = 0;
let users = []
/* import modules */
const express = require('express');
const app = express();
const PORT = 4000;
/* create express app */
const http = require('http').Server(app);
const cors = require('cors');
const { emit } = require('process');
app.use(cors());

const io = require('socket.io')(http,{
    cors : {
        origin : "https://admirable-blini-1a310f.netlify.app/"
    }
})




/* Create Connection */
io.on('connection',(socket)=>{
    /* Message Receiving */
    console.log('User connected');

    /* Listen for new user */
    socket.on('newUser',(data)=>{
        users.push(data);
        
        io.emit('userCounter',users)
    })


    socket.on('message',(data)=>{
        console.log(data)
        io.emit('messageResponse',data)
    })

    socket.on('typingStatus',(data)=>{
        console.log(data)
        socket.broadcast.emit('typingResponse',data)
    })
    /* Disconnection */
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        //Updates the list of users when a user disconnects from the server
        users = users.filter((user) => user.socketID !== socket.id);
        // console.log(users);
        //Sends the list of users to the client
        io.emit('userCounter', users);
        socket.disconnect();
       
    })
})


/* Routes */
app.get('/api',(req,res)=>{
    res.json({
        message : "Server is Running"
    })
})


/* Port forwarding */
http.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server is running on PORT ${PORT}`)
});
