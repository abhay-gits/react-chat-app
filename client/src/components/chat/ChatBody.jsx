import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import exit from '../../assets/exit.svg';
import eye from '../../assets/eye.svg';
function ChatBody({ messages, lastMessageRef, typingStatus, socket}) {

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

    /*  */

   /*  const [key, setKey] = useState(0);

  const reloadComponent = () => {
    setKey(key => key + 1);
  }; */


    useEffect(()=>{
        socket.on('clearMessages',()=>{
            window.location.reload();   
        })
    },[socket,messages])

    return (
        <>
            <header className="header">
                <h2>Incognito Chat</h2>
                <div style={{ display: "flex" }}>
                    <img src={exit} alt="exit" className="exitBtn" onClick={handleLeaveChat}  />
                    <button className="leaveBtn" onClick={handleLeaveChat}>Leave Chat</button>
                    <img src={eye} onClick={menuClick} className="menuBtn" alt="menu" />
                </div>
            </header>
            <div className="message_status" >
                <p style={{ paddingLeft: '10px' }}>💬 {typingStatus}</p>
            </div>
            <div className="message_container" >

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
                                <p className="deleteMessage">{message.text}</p>
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