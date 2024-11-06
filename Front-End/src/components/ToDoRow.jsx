import PropTypes from 'prop-types';

export default function ToDoRow({ todo, toggleTaskCompletion }) {
  return (
    <li
      onClick={() => toggleTaskCompletion(todo.id)}
      style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
    >
      {todo.task}
    </li>
  );
}

ToDoRow.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    task: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  toggleTaskCompletion: PropTypes.func.isRequired,
};