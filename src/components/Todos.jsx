
import { useState } from "react";

function Todos() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");
  const [priority, setPriority] = useState("Medium");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();

    if (trimmed === "") {
      return;
    }

    const newTodo = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
      priority: priority,
    };

    setTodos([...todos, newTodo]);
    setText("");
    setPriority("Medium");
  }

  function handleToggle(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function handleClearCompleted() {
    setTodos(todos.filter((todo) => !todo.completed));
  }

  function handleToggleAll() {
    const unfinishedCount = todos.filter((todo) => !todo.completed).length;
    const shouldCompleteAll = unfinishedCount !== 0;

    setTodos(
      todos.map((todo) => ({
        ...todo,
        completed: shouldCompleteAll,
      })),
    );
  }

  const unfinishedCount = todos.filter((todo) => !todo.completed).length;
  const allCompleted = unfinishedCount === 0;

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active") {
      return !todo.completed;
    }

    if (filter === "Completed") {
      return todo.completed;
    }

    return true;
  });

  const selectedClass =
    "cursor-pointer rounded-[3px] border border-[#b83f45]/20 px-[7px] py-[3px]";

  const unselectedClass =
    "cursor-pointer rounded-[3px] border border-transparent px-[7px] py-[3px] hover:border-[#b83f45]/10";

  return (
    <section className="mx-auto max-w-[550px]">
      <h1 className="text-center text-[80px] font-extralight text-[#b83f45]">
        todos
      </h1>

      <div className="relative bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.2),0_25px_50px_0_rgba(0,0,0,0.1)]">
        <form onSubmit={handleSubmit}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="h-[65px] w-full py-4 pr-4 pl-[60px] text-2xl shadow-[inset_0_-2px_1px_rgba(0,0,0,0.03)] outline-none placeholder:text-black/40 placeholder:italic focus:shadow-[0_0_2px_2px_#cf7d7d]"
            placeholder="What needs to be done?"
          />

          <div className="flex items-center justify-end gap-2 border-t border-[#e6e6e6] px-4 py-2">
            <label htmlFor="priority" className="text-sm text-[#777]">
              Priority:
            </label>

            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="cursor-pointer rounded border border-[#e6e6e6] px-2 py-1 text-sm outline-none"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <button
              type="submit"
              className="rounded bg-[#b83f45] px-3 py-1 text-sm text-white hover:bg-[#963238]"
            >
              Add
            </button>
          </div>
        </form>

        {todos.length > 0 && (
          <>
            <main className="relative border-t border-[#e6e6e6]">
              <input
                id="toggle-all"
                type="checkbox"
                checked={allCompleted}
                onChange={handleToggleAll}
                className="peer sr-only"
              />

              <label
                htmlFor="toggle-all"
                className="absolute -top-[66px] left-0 flex h-[65px] w-[60px] cursor-pointer items-center justify-center text-[22px] text-[#949494] peer-checked:text-[#484848]"
              >
                <span className="rotate-90">❯</span>
              </label>

              <ul>
                {filteredTodos.map((todo) => (
                  <li
                    key={todo.id}
                    className="group relative flex items-center border-b border-[#ededed] text-2xl"
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggle(todo.id)}
                      className="ml-[15px] size-[30px] shrink-0 cursor-pointer accent-[#59a193]"
                    />

                    <span
                      className={
                        todo.completed
                          ? "flex-1 py-[15px] pr-[60px] pl-[15px] break-all text-[#949494] line-through"
                          : "flex-1 py-[15px] pr-[60px] pl-[15px] break-all"
                      }
                    >
                      {todo.text}
                    </span>

                    <span
                      className={`mr-3 shrink-0 rounded px-2 py-1 text-xs font-medium ${
                        todo.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : todo.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {todo.priority}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleDelete(todo.id)}
                      className="absolute right-[10px] hidden size-10 cursor-pointer text-[30px] text-[#949494] group-hover:block hover:text-[#c18585]"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </main>

            <footer className="grid h-10 grid-cols-3 items-center border-t border-[#e6e6e6] px-[15px] text-[15px]">
              <span>
                <strong className="font-light">{unfinishedCount}</strong>{" "}
                {unfinishedCount === 1 ? "item" : "items"} left
              </span>

              <ul className="flex justify-center gap-1">
                <li>
                  <button
                    type="button"
                    onClick={() => setFilter("All")}
                    className={
                      filter === "All" ? selectedClass : unselectedClass
                    }
                  >
                    All
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() => setFilter("Active")}
                    className={
                      filter === "Active" ? selectedClass : unselectedClass
                    }
                  >
                    Active
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() => setFilter("Completed")}
                    className={
                      filter === "Completed" ? selectedClass : unselectedClass
                    }
                  >
                    Completed
                  </button>
                </li>
              </ul>

              {todos.some((todo) => todo.completed) && (
                <button
                  type="button"
                  onClick={handleClearCompleted}
                  className="cursor-pointer justify-self-end hover:underline"
                >
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}
      </div>
    </section>
  );
}

export default Todos;
