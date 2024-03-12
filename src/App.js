// react
import { useEffect, useReducer, useState } from "react";
// chakra
import { Box, Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
// components
import AddTaskControl from "./components/AddTaskControl";
import TasksList from "./components/TasksList";
import ChangeTasksFilterControl from "./components/ChangeTasksFilterControl";

import tasksReducer, { actionTypes } from "./tasksReducer";

export const tasksFilters = {
  ALL: 0,
  ACTIVE: 1,
  COMPLETED: 2,
};

function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, JSON.parse(localStorage
    .getItem("chakra-todolist-tasks")) || []);
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
    dispatch({ type: actionTypes.ADD_ONE, payload: { text } });
  }

  function removeOneTask(id) {
    dispatch({ type: actionTypes.REMOVE_ONE, payload: { id } });
  }

  function toggleOneTaskCompleteness(id) {
    dispatch({ type: actionTypes.TOGGLE_ONE_COMPLETENESS, payload: { id } });
  }

  function editOneTaskText(id, newText) {
    dispatch({ type: actionTypes.UPDATE_ONE_TEXT, payload: { id, text: newText } });
  }

  function cleanTasksByFilter(filter) {
    switch (filter) {
      case tasksFilters.ALL:
        dispatch({ type: actionTypes.CLEAN_ALL });
        break;
      case tasksFilters.ACTIVE:
        dispatch({ type: actionTypes.CLEAN_ACTIVE });
        break;
      case tasksFilters.COMPLETED:
        dispatch({ type: actionTypes.CLEAN_COMPLETED });
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
