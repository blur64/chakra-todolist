// react
import { useState } from "react";
// chakra
import { Box } from "@chakra-ui/react";
// components
import AddTaskControl from "./components/AddTaskControl";
import TasksList from "./components/TasksList";
import ChangeVisibleTasksTypeControl from "./components/ChangeVisibleTasksTypeControl";

function App() {
  const [tasks, setTasks] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [visibleTasksType, setVisibleTasksType] = useState("all");

  const visibleTasks = tasks.filter(t => {
    if (visibleTasksType === "active") {
      return !t.isCompleted;
    }
    if (visibleTasksType === "completed") {
      return t.isCompleted;
    }
    return t;
  });

  function changeVisibleTasksType(type) {
    setVisibleTasksType(type);
  }

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
      <ChangeVisibleTasksTypeControl
        currentType={visibleTasksType}
        onChange={changeVisibleTasksType}
      />
      <TasksList
        onRemoveOne={removeOneTask}
        onToggleOneCompleteness={toggleOneTaskCompleteness}
        onEditTextOne={editOneTaskText}
        tasks={visibleTasks}
      />
    </Box>
  );
}

export default App;
