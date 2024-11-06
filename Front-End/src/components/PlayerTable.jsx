import PlayerRow from "./PlayerRow";
import PropTypes from "prop-types";

export default function PlayerTable({ players }) {
    return (
        <table>
            <thead>
                <tr>    
                    <th>Id</th>
                    <th>Player</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {players.map(player => 
                    <PlayerRow key={player.id} id={player.id} player={player} />
                )}
            </tbody>
        </table>
    );
}

PlayerTable.propTypes = {
    players: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            score: PropTypes.number.isRequired
        })
    ).isRequired
};
