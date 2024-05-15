import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './home.module.css';

function Home({socket}) {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const handleClick =(e)=> {
        e.preventDefault();
        localStorage.setItem('username', username);
        socket.emit('newUser',{username,socketID: socket.id})   
        navigate('/chat');
    }
    return (

        <div className={styles.main}>
            <h1 className={styles.heading}>Chat App</h1>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleClick}>
                    <input type="name" id="username" className={styles.input} placeholder="Enter Username"
                        value={username} onChange={(e) => setUsername(e.target.value) } maxLength={20} required
                    />
                    <button className={styles.submitBtn}>Enter Chat</button>
                </form>
            </div>
        </div>

    )
}

export default Home;