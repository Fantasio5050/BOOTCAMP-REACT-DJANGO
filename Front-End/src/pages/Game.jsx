import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css';
import './Game.css';

const Game = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { game } = location.state || {};
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [currentTurn, setCurrentTurn] = useState(1);
    const [currentPlayerScore, setCurrentPlayerScore] = useState(0);
    const [dicesNum, setDicesNum] = useState(1);


    { /* In case the game is null */ }
    if (!game || game === null || game === undefined) {
        navigate('/');
        return null;
    }

    { /* Function to switch to the next player */ }
    const endTurn = (newScore) => {
        game.players[currentPlayerIndex].score += newScore;
        setCurrentPlayerScore(0);
        if (currentPlayerIndex === game.players.length - 1) {
            setCurrentPlayerIndex(0);
            setCurrentTurn(currentTurn + 1);
        } else {
            setCurrentPlayerIndex(currentPlayerIndex + 1);
        }
    };

    { /* Function to simulate rolling dice(s) */ }
    const rollDice = (numDice) => {
        let result = 0;
        for (let i = 0; i < numDice; i++) {
            result += Math.floor(Math.random() * 6) + 1;
        }
        let newScore = currentPlayerScore + result;
        if (newScore > 21) {            
            toast.error('Busted !');
            newScore = 0;
            endTurn(newScore);
        } else if (newScore === 21) {
            setCurrentPlayerScore();
            toast.success('Blackjack !');
            endTurn(newScore);
        } else {
            setCurrentPlayerScore(newScore);
        }
    };

    return (
        <div className="container">
            <h1 className="text-dark">{game.name}</h1>
            <h2 className="text-dark">Turn: {currentTurn}</h2>
            <h3 className="text-dark">Current Player: {game.players[currentPlayerIndex].name}</h3>
            <h3 className="text-dark">Current Score: {currentPlayerScore}</h3>
            <div className='text-dark'>
                <h3>Select number of dices to roll</h3>
                <input type='radio' name='dice' value='1' onClick={() => setDicesNum(1)}/> 1 
                <input type='radio' name='dice' value='2' onClick={() => setDicesNum(2)}/> 2 
                <input type='radio' name='dice' value='3' onClick={() => setDicesNum(3)}/> 3 
                <button onClick={() => rollDice(dicesNum)}>Roll dice(s)</button>
            </div>
            <button onClick={() => endTurn(currentPlayerScore)}>End turn</button>
            <div className="scoreboard">
                <h3 className="text-dark">Scoreboard</h3>
                {game.players.map((player) => (
                    <div key={player.id} className="player">
                        <span className="text-dark">{player.name}</span>
                        <span className="text-dark">Score: {player.score}</span>
                    </div>
                ))}
            </div>
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} pauseOnFocusLoss />
        </div>
    );
};



export default Game;