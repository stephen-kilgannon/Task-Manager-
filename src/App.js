import "./App.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState, useEffect } from "react";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Do this", dueDate: "20-12-2021", status: true },
    // { id: 2, text: "Do this 1", day: "20-10-2021", reminder: true },
    // { id: 3, text: "Do this 2", day: "20-01-2021", reminder: true },
  ]);

  //loadData
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();

      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:4004/admin/Activities");
    const data = await res.json();
    let test = Object.values(data);
    const returnData = test[1];
    return returnData;
  };

  // Add Task
  const addTask = (task) => {
    const id = tasks.length + 1;

    const newTask = { id, ...task };

    setTasks([...tasks, newTask]);
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Task
  const toogleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toogleTask} />
      ) : (
        "No Tasks"
      )}
    </div>
  );
}

export default App;
