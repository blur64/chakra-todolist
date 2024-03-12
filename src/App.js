// react
import { useState, useEffect } from "react";
// chakra
import { Box, Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
// components
import AddTaskControl from "./components/AddTaskControl";
import TasksList from "./components/TasksList";
import ChangeTasksFilterControl from "./components/ChangeTasksFilterControl";

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

export const tasksFilters = {
  ALL: 0,
  ACTIVE: 1,
  COMPLETED: 2,
};

function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("chakra-todolist-tasks")) || []);
  const [nextId, setNextId] = useState(findMaxId(tasks) + 1);
  const [currentTasksFilter, setCurrentTasksFilter] = useState(tasksFilters.ALL);

  const visibleTasks = tasks.filter(t => {
    if (currentTasksFilter === tasksFilters.ACTIVE) {
      return !t.isCompleted;
    }
    if (currentTasksFilter === tasksFilters.COMPLETED) {
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

  function changeCurrentTasksFilter(filter) {
    setCurrentTasksFilter(filter);
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

  function cleanTasksByFilter(filter) {
    switch (filter) {
      case tasksFilters.ALL:
        setTasks([]);
        break;
      case tasksFilters.ACTIVE:
        setTasks(tasks.filter(t => t.isCompleted));
        break;
      case tasksFilters.COMPLETED:
        setTasks(tasks.filter(t => !t.isCompleted));
        break;
      default:
        throw new TypeError(`Unexpected filter type: ${filter}`);
    }
  }

  return (
    <Box w="sm" mx="auto" mt={4}>
      <AddTaskControl onTaskDataCreate={createTask} />
      <p>Completeness: {completenessPercentage}%</p>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Remove
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => cleanTasksByFilter(tasksFilters.ALL)}>All</MenuItem>
          <MenuItem onClick={() => cleanTasksByFilter(tasksFilters.ACTIVE)}>Active</MenuItem>
          <MenuItem onClick={() => cleanTasksByFilter(tasksFilters.COMPLETED)}>Completed</MenuItem>
        </MenuList>
      </Menu>
      <ChangeTasksFilterControl
        currentFilter={currentTasksFilter}
        onChange={changeCurrentTasksFilter}
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
