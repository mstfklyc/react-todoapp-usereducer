import { useState, useReducer } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FcAddDatabase } from "react-icons/fc";
function App() {
  const ACTIONS = {
    ADD_TODO: "addTodo",
    REMOVE_TODO: "removeTodo",
    TOGGLE_COMPLETE: "toggleTodo",
    EDIT_TODO: "editTodo",
  };
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");
  function newTodo(name) {
    return { id: Date.now(), name: name, complete: false };
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName("");
  }

  function reducer(todos, action) {
    switch (action.type) {
      case ACTIONS.ADD_TODO:
        return [...todos, newTodo(action.payload.name)];
      case ACTIONS.REMOVE_TODO:
        return todos.filter((todo) => todo.id !== action.payload.id);
      case ACTIONS.TOGGLE_COMPLETE:
        return todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, complete: !todo.complete };
          }
          return todo;
        });

      default:
        return todos;
    }
  }

  return (
    <main>
      <section className="container">
        <header className="main-header">
          <h2 className="main-h1">React Todo App</h2>
        </header>
        <section className="text-area">
          <input
            className="textarea"
            type="text"

            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>

          <button onClick={handleSubmit} disabled={!name} className="add-btn">
            Add
          </button>
        </section>
        <div className="list-container">
          {todos.map((todo) => {
            return (
              <div key={todo.id} className={todo ? "list-items" : "not-listed"}>
                <li className={todo.complete ? "completed" : "not Completed"}>
                  {todo.name}
                </li>{" "}
                <input
                  type="checkbox"
                  className="checkbox"
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.TOGGLE_COMPLETE,
                      payload: { id: todo.id },
                    })
                  }
                ></input>
                <h2><AiOutlineDelete
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.REMOVE_TODO,
                      payload: { id: todo.id },
                    })
                  }
                /></h2>

              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default App;
