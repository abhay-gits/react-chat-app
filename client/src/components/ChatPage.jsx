import { useEffect, useRef, useState } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

function ChatPage({socket}){

    const[messages,setMessages] = useState([]);
    const[user,setUser] = useState([]);
    const[typingStatus,setTypingStatus] = useState('');
    const lastMessageRef = useRef(null);

    useEffect(()=>{
        socket.on('messageResponse',(data)=>{
            setMessages([...messages,data])
        })
    },[socket,messages])

    useEffect(()=>{
        socket.on('newUserJoined',(data)=>{
            setUser([...user,data]);
        })
    },[socket])

    useEffect(()=>{
        lastMessageRef.current?.scrollIntoView({behaviour:'smooth'})
    },[messages])

    useEffect(() => {
        socket.on('typingResponse', (data) => setTypingStatus(data));
      }, [socket]);


    return(
        <div className="chat">
            <ChatBar socket={socket}></ChatBar>
            <div className="chat_main">
            <ChatBody
            user={user}
             messages={messages}
            lastMessageRef={lastMessageRef} 
            typingStatus={typingStatus}>
            </ChatBody>
            <ChatFooter socket={socket}></ChatFooter>
            </div>
        </div>
    )
}

export default ChatPage;