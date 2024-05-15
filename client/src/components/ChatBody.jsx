import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function ChatBody({ messages, lastMessageRef, typingStatus, user }) {

    const navigate = useNavigate();
    function handleLeaveChat() {
        localStorage.removeItem('username');
        navigate('/')
        window.location.reload();
    }

    function menuClick() {
        const menu = document.querySelector('.menu');
        menu.classList.toggle('active');
    }

    return (
        <>
            <header className="header">
                <h2>Incognito Chat</h2>
                <div style={{display:"flex"}}>
                <svg className="exitBtn" onClick={handleLeaveChat} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#fff" fill="none">
                    <path d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373L3 11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <button className="leaveBtn" onClick={handleLeaveChat}>Leave Chat</button>
                <svg onClick={menuClick} className="menuBtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#fff" fill="none">
                    <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" stroke-width="1.5" />
                    <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" stroke-width="1.5" />
                </svg>
                </div>
            </header>
            <div className="message_status">
                <p style={{ paddingLeft: '10px' }}>💬 {typingStatus}</p>
            </div>
            <div className="message_container">

                {messages.map((message) =>
                    message.name === localStorage.getItem('username') ? (

                        <div className="messageBody send" key={message.id}>
                            <div className="message sender">
                                <p>{message.text}</p>
                            </div>
                        </div>
                    ) : (
                        < div className="messageBody recieve" key={message.id} >
                            <p>{message.name}</p>
                            <div className="message recipient">
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