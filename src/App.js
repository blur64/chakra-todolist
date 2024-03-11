// react
import { useState, useEffect } from "react";
// chakra
import { Box } from "@chakra-ui/react";
// components
import AddTaskControl from "./components/AddTaskControl";
import TasksList from "./components/TasksList";
import ChangeVisibleTasksTypeControl from "./components/ChangeVisibleTasksTypeControl";

function findMaxId(items) {
  return Math.max(0, ...items.map(i => i.id));
}

function validateTaskText(text) {
  const textType = typeof text;
  if (textType !== "string") {
    throw new TypeError(`Unexpected type of task text: ${textType}`);
  } else if (!text.length) {
    throw new Error(`Empty task text is not allowed`);
  }
}
function validateTaskId(id) {
  const idType = typeof id;
  if (idType !== "number") {
    throw new TypeError(`Unexpected type of task id: ${idType}`);
  } else if (id <= 0) {
    throw new Error(`Task id must be more than 0`);
  }
}

function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("chakra-todolist-tasks")) || []);
  const [nextId, setNextId] = useState(findMaxId(tasks) + 1);
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

  const tasksCount = tasks.length;
  const completenessPercentage = tasksCount ?
    Math.round(tasks.filter(t => t.isCompleted).length / tasksCount * 100) :
    0;

  useEffect(() => localStorage
    .setItem("chakra-todolist-tasks", JSON.stringify(tasks)), [tasks]);

  function changeVisibleTasksType(type) {
    setVisibleTasksType(type);
  }

  function createTask(text) {
    validateTaskText(text);
    setTasks([{ id: nextId, text, isCompleted: false }, ...tasks]);
    setNextId(nextId + 1);
  }

  function removeOneTask(id) {
    validateTaskId(id);
    setTasks(tasks.filter(t => t.id !== id));
  }

  function toggleOneTaskCompleteness(id) {
    validateTaskId(id);
    setTasks(tasks.map(t => t.id === id ?
      { ...t, isCompleted: !t.isCompleted } : t));
  }

  function editOneTaskText(id, newText) {
    validateTaskText(newText);
    validateTaskId(id);
    setTasks(tasks.map(t => t.id === id ?
      { ...t, text: newText } : t));
  }

  return (
    <Box w="sm" mx="auto" mt={4}>
      <AddTaskControl onTaskDataCreate={createTask} />
      <p>Completeness: {completenessPercentage}%</p>
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
