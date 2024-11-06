import PropTypes from "prop-types";


export default function PlayerRow({ player }) {
    return (
        <tr>
            <td>{player.id}</td>
            <td>{player.name}</td>
            <td>{player.score}</td>
        </tr>
    );
}

PlayerRow.propTypes = {
    player: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired
    }).isRequired
};