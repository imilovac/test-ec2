import { baseURL } from "../App";

const ListTodos = ({ todos, setTodos }) => {
  const deleteTodo = async (todo_id) => {
    try {
      await fetch(`${baseURL}/${todo_id}`, {
        method: "DELETE",
      });

      const filteredTodos = todos.filter((todo) => todo.todo_id !== todo_id);
      setTodos(filteredTodos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            return (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ListTodos;
