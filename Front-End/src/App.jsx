import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Blackjack from "./pages/Blackjack.jsx";
import Toto from "./pages/Toto.jsx";
import Game from "./pages/Game.jsx";



function App() {

  const navigate = useNavigate();

  return (
    <>
    <button onClick={() => navigate("/")}>Blackjack</button>&emsp;
    <button onClick={() => navigate("/toto")}>Toto</button>
  
      <Routes>
        <Route path="/" element={<Blackjack />} />
        <Route path="/toto" element={<Toto />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
