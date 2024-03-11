import { useState } from "react";

// chakra
import { Box } from "@chakra-ui/react";

// components
import AddTaskControl from "./components/AddTaskControl";
import TasksList from "./components/TasksList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [nextId, setNextId] = useState(0);

  function createTask(text) {
    setTasks([{ id: nextId, text }, ...tasks]);
    setNextId(nextId + 1);
  }

  function removeOneTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  return (
    <Box w="sm" mx="auto" mt={4}>
      <AddTaskControl onTaskDataCreate={createTask} />
      <TasksList tasks={tasks} onRemoveOne={removeOneTask} />
    </Box>
  );
}

export default App;
