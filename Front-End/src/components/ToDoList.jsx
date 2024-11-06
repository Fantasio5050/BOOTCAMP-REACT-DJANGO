import PropTypes from 'prop-types';
import ToDoRow from './ToDoRow.jsx';

export default function ToDoList({ todos, toggleTaskCompletion }) {
  return (
    <ul>
      {todos.map(todo => (
        <ToDoRow key={todo.id} todo={todo} toggleTaskCompletion={toggleTaskCompletion} />
      ))}
    </ul>
  );
}

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      task: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
    })
  ).isRequired,
  toggleTaskCompletion: PropTypes.func.isRequired,
};