import "./App.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState, useEffect } from "react";

const URL =
  "https://cb976dedtrial-dev-cap-kt-srv.cfapps.eu10.hana.ondemand.com/user/Activities";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

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
    const res = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    let test = Object.values(data);
    const returnData = test[1];
    return returnData;
  };

  // Add Task
  const addTask = async (task) => {
    const id = getRandomInt(50);
    console.log(id);
    const newTask = { id, ...task };
    console.log(task);
    setTasks([...tasks, newTask]);

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  };

  //generate Id
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // Delete Task
  const deleteTask = async (id) => {
    setTasks(tasks.filter((task) => task.id !== id));

    const response = await fetch(URL + `(${id})`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json(); // parses JSON response into native JavaScript objects
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
