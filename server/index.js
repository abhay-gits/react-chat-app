let users = []
let pattern = /abhay/;
const express = require('express');
const app = express();
const PORT = 4000;
const http = require('http').Server(app);
const cors = require('cors');
const { emit } = require('process');
app.use(cors());
const io = require('socket.io')(http,{
cors : {
    origin : ["https://textabhay.netlify.app","http://localhost:5173"]
}
})
let timer = 0;
/* Connection Started */
io.on('connection',(socket)=>{
    /* Handle normal users */
    socket.on('newUser',(data)=>{
            users.push(data);
            io.emit('userCounter',users)
    })
    /* Messages Transfer */
    socket.on('message',(data)=>{
        if(data.name === "admin"){
            if(data.name === "admin" && data.text === "clear"){
                io.emit('clearMessages',"")
            }else{
                io.emit('messageResponse',data)
            }
        }
        else{
            io.emit('messageResponse',data)
        }
    })
    /* Who's Typing */
    socket.on('typingStatus',(data)=>{
            socket.broadcast.emit('typingResponse',data)
        
        /* Clear typing */
        clearTimeout(timer)
        timer = setTimeout(()=>{
            socket.broadcast.emit('typingResponse',"")
        },1000)
    })
    /* Disconnection */
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
