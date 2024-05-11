import { useEffect, useState } from "react";
import styles from "./chatbar.module.css"

function ChatBar({socket}){
    const[userCount,setUserCount] = useState([]);

    useEffect(() => {
        socket.on('userCounter',(data) => setUserCount(data));
      }, [socket, userCount]);

    return (
        <div className={styles.chatbar}>
            <h4 className={styles.header}>Active Users</h4>
            <div className={styles.user}>
                {userCount.map((user) => (
                    <p key={user.socketID}>{user.username}</p>
                ))}
            </div>
            <div className={styles.userCount}>
                <span>Active users : {userCount.length}</span>
            </div>
        </div>
    );
}

export default ChatBar;