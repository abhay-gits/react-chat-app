import { useNavigate } from "react-router-dom";
function ChatBody({ messages, lastMessageRef, typingStatus }) {
    const navigate = useNavigate();
    function handleLeaveChat() {
        localStorage.removeItem('username');
        /* socket.emit('userLeft',{username,socketID:socket.id}) */
        navigate('/')
        window.location.reload();
    }
    return (
        <>
            <header className="header">
                <h2>Incognito Chat</h2>
                <button className="leaveBtn" onClick={handleLeaveChat}>Leave Chat</button>
            </header>
            <div className="message_status">
                <p style={{paddingLeft:'10px'}}>💬 {typingStatus}</p>
            </div>
            <div className="message_container">

                {messages.map((message) =>
                    message.name === localStorage.getItem('username') ? (
                        <div className="messageBody send" key={message.id}>
                            <p className="sender_name">You</p>
                            <div className="message_sender">
                                <p>{message.text}</p>
                            </div>
                        </div>
                    ) : (

                        < div className="messageBody recieve" key={message.id} >
                            <p>{message.name}</p>
                            <div className="message_recipient">
                                <p>{message.text}</p>
                            </div>
                        </div>)
                )
                }
                <div ref={lastMessageRef} />
            </div >
        </>
    )
}

export default ChatBody;