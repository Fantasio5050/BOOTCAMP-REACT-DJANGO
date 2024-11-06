import { useState } from 'react';
import useCreateGame from '../hooks/useCreateGame';
import { useNavigate } from 'react-router-dom';

export default function Blackjack() {
    const { createGame } = useCreateGame();
    const [name, setName] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();

    const handleStartGame = async () => {
        if (name.trim() === '') {
            alert('Please enter a game name.');
            return;
        } else if (players.length < 1) {
            alert('Please add at least one player.');
            return;
        }
        const game = {
            name: name,
            players: players,
        };
        const createdGame = await createGame(game);
        navigate('/game', { state: { game: createdGame } });
    };

    const addPlayer = () => {
        if (playerName.trim() !== '') {
            if (players.length >= 4) {
                alert('Max 4 players');
                return;
            }
            setPlayers([...players, playerName.trim()]);
            setPlayerName('');
        }
    };

    const removePlayer = (index) => {
        setPlayers(players.filter((_, i) => i !== index));
    };

    const playerGridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: '10px',
        backgroundColor: '#c0c0c0',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };

    const playerStyle = {
        color: '#000',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };

    const addPlayerBtn = {
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
    };

    return (
        <>
            <h1>Blackjack</h1>
            <section>
                <section>
                    <div>
                        <label htmlFor="name">Game name :&nbsp;</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>&nbsp;
                    <div>
                        <label htmlFor="playerName">Player name :&nbsp;</label>
                        <input
                            type="text"
                            id="playerName"
                            name="playerName"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                        />
                    </div>
                    <button type="button" onClick={addPlayer} style={addPlayerBtn}>Add Player</button>
                    <div>
                        <h3>Players :</h3>
                        <section style={playerGridStyle}>
                            {players.map((player, index) => (
                                <div key={index} style={playerStyle}>
                                    {player}&nbsp;
                                    <button type="button" onClick={() => removePlayer(index)}>Remove</button>
                                </div>
                            ))}
                        </section>
                    </div>
                    <br />
                    <button type="button" onClick={handleStartGame}>Start Game !</button>
                </section>
            </section>
        </>
    );
}