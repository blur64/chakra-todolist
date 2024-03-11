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
    setTasks([{ id: nextId, text, isCompleted: false }, ...tasks]);
    setNextId(nextId + 1);
  }

  function removeOneTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  function toggleOneTaskCompleteness(id) {
    setTasks(tasks.map(t => t.id === id ?
      { ...t, isCompleted: !t.isCompleted } : t));
  }

  function editOneTaskText(id, newText) {
    setTasks(tasks.map(t => t.id === id ?
      { ...t, text: newText } : t));
  }

  return (
    <Box w="sm" mx="auto" mt={4}>
      <AddTaskControl onTaskDataCreate={createTask} />
      <TasksList
        onRemoveOne={removeOneTask}
        onToggleOneCompleteness={toggleOneTaskCompleteness}
        onEditTextOne={editOneTaskText}
        tasks={tasks}
      />
    </Box>
  );
}

export default App;
