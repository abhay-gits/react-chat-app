import { useState } from "react";
function ChatFooter({socket}){
    const [message,setMessage] = useState('');
    /* const [typingTimeout, setTypingTimeout] = useState(null); */

    const handleKeyDown = () => {
        socket.emit('typingStatus', `${localStorage.getItem('username')} is typing...`);
       /*  if (typingTimeout) clearTimeout(typingTimeout);
        setTypingTimeout(setTimeout(() => {
            socket.emit('typingStatus', "");
        }, 1000));  */
    
    }

    

    function handleSendBtn(e){
        e.preventDefault();
        if(localStorage.getItem('username') && message.trim()){
            socket.emit('message',{
                text : message,
                name : localStorage.getItem('username'),
                id : `${socket.id}${Math.random()}`,
                SocketID : socket.id
            })
        }
        setMessage('')
    }


    return(
        <div className="chat_footer">
            <form className="form" onSubmit={handleSendBtn}>
                <input 
                type="text" 
                placeholder="Enter message..." 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                
                />
                <button /* onKeyUp={handleKeyUp} */ className="sendBtn">Send</button>
            </form>
        </div>
    )
}

export default ChatFooter;