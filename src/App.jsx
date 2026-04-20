import { useState } from "react";

function App() {
  // ✅ EMPTY initially
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  const getTime = () => {
    const now = new Date();
    return now.toLocaleString();
  };

  // ADD TASK
  const addTask = () => {
    if (input.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: input,
      time: getTime(),
      completed: false
    };

    setTasks([newTask, ...tasks]);
    setInput("");
  };

  // DELETE
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // TOGGLE
  const toggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // EDIT
  const editTask = (id) => {
    const newText = prompt("Edit task:");
    if (!newText) return;

    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  // FILTER
  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f1f6",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >
      {/* HEADER */}
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#111" }}>
        TODO LIST
      </h1>

      {/* INPUT + FILTER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "700px",
          margin: "0 auto 20px"
        }}
      >
        <div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter task..."
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginRight: "10px"
            }}
          />

          <button
            onClick={addTask}
            style={{
              padding: "10px 15px",
              background: "#6366f1",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Add Task
          </button>
        </div>

        <select
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* TASK LIST */}
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "#e5e7eb",
          padding: "15px",
          borderRadius: "10px"
        }}
      >
        {filteredTasks.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>
            No tasks yet. Add one 👆
          </p>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              style={{
                background: "#f9fafb",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />

                <span
                  style={{
                    marginLeft: "10px",
                    textDecoration: task.completed
                      ? "line-through"
                      : "none"
                  }}
                >
                  {task.text}
                </span>

                <div style={{ fontSize: "12px", color: "#666" }}>
                  {task.time}
                </div>
              </div>

              <div>
                <button
                  onClick={() => editTask(task.id)}
                  style={{
                    marginRight: "8px",
                    border: "none",
                    background: "#ddd",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  ✏️
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    border: "none",
                    background: "red",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;