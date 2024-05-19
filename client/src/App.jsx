import { BrowserRouter, Route, Routes } from 'react-router-dom';
import socketIO from 'socket.io-client';
import Home from './pages/Home';
import ChatHome from './components/chat/Home';
import ChatPage from './components/chat/ChatPage';
const socket = socketIO.connect('https://react-chat-app-wppd.onrender.com');
/* const socket = socketIO.connect('http://localhost:4000/'); */

function App() {
  return (
    <BrowserRouter>
    <div>
        <Routes>
          <Route path='/' element={<ChatHome socket={socket} />}></Route>
          <Route path='/chat' element={<ChatPage socket={socket} />}></Route>  
        
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
