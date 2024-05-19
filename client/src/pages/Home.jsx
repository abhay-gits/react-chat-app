import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    function HandleChatClick() {
        navigate('/chatapp');
    }
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={HandleChatClick}>Chat App</button>
    </div>
  );
}

export default Home;