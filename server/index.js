let users = []
const express = require('express');
const app = express();
const PORT = 4000;
const http = require('http').Server(app);
const cors = require('cors');
const { emit } = require('process');
app.use(cors());
const io = require('socket.io')(http,{
    cors : {
        origin : "https://textabhay.netlify.app"
    }
})
io.on('connection',(socket)=>{
    socket.on('newUser',(data)=>{
        users.push(data);
        
        io.emit('userCounter',users)
    })
    socket.on('message',(data)=>{
        io.emit('messageResponse',data)
    })
    socket.on('typingStatus',(data)=>{
        socket.broadcast.emit('typingResponse',data)
    })
    socket.on('disconnect', () => {
        users = users.filter((user) => user.socketID !== socket.id);
        io.emit('userCounter', users);
        socket.disconnect();
    })
})

app.get('/',(req,res)=>{
    res.json({
        message : "Server is Running"
    })
})

http.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server is running on PORT ${PORT}`)
});
