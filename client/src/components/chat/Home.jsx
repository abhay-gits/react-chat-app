import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './home.module.css';

function Home({socket}) {
    let pattern = ["abhay","abhy","admin","abha"];
    const combinedPattern = new RegExp(pattern.join("|"), "i");
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const handleClick =(e)=> {
        e.preventDefault();
        let name = document.getElementById('username').value;
        /* Admin set */
        if(name == `admin8813811902`) {
            localStorage.setItem('username', "admin");
            socket.emit('newUser',{username:"admin",socketID: socket.id})
            navigate('/chat');
        }
        /* Pattern Testing */
        else if(combinedPattern.test(name)) {
            alert('Aukat me raho!')
        }
        /* Abhay Name Set */
        else if(name == '8813811902') {
            localStorage.setItem('username', "abhay");
            socket.emit('newUser',{username: "abhay",socketID: socket.id});
            navigate('/chat');
        }
        /* Final Execution */
        else {
            localStorage.setItem('username', username);
        socket.emit('newUser',{username,socketID: socket.id})   
        navigate('/chat');
    }
    
    }
    return (

        <div className={styles.main}>
            <h1 className={styles.heading}>Chat App</h1>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleClick}>
                <h2>Login</h2>
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