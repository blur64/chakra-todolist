// react
import { useEffect, useReducer, useState, useCallback, useMemo } from "react";
// chakra
import { Box, Menu, MenuButton, MenuList, MenuItem, Button, Container, Flex, Spacer, CircularProgress, CircularProgressLabel, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
// components
import AddTaskControl from "./components/AddTaskControl";
import TasksList from "./components/TasksList";
import ChangeTasksFilterControl from "./components/ChangeTasksFilterControl";
// other
import tasksReducer from "./tasks/reducer";
import { saveTasks, getTasks } from "./api";
import { tasksFilters, actionTypes } from "./constants";

function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, getTasks());
  const [currentTasksFilter, setCurrentTasksFilter] = useState(tasksFilters.ALL);

  useEffect(() => saveTasks(tasks), [tasks]);

  const visibleTasks = tasks.filter(t => {
    if (currentTasksFilter === tasksFilters.ACTIVE) {
      return !t.isCompleted;
    }
    if (currentTasksFilter === tasksFilters.COMPLETED) {
      return t.isCompleted;
    }
    return t;
  });

  const completenessPercentage = useMemo(() => tasks.length ?
    Math.round(tasks.filter(t => t.isCompleted).length / tasks.length * 100) :
    0, [tasks]);

  const changeCurrentTasksFilter = useCallback((newFilter) =>
    setCurrentTasksFilter(newFilter), []);

  const createTask = useCallback((text) =>
    dispatch({ type: actionTypes.ADD_ONE, payload: { text } }), []);
  const removeOneTask = useCallback((id) =>
    dispatch({ type: actionTypes.REMOVE_ONE, payload: { id } }), []);
  const toggleOneTaskCompleteness = useCallback((id) =>
    dispatch({ type: actionTypes.TOGGLE_ONE_COMPLETENESS, payload: { id } }), []);
  const editOneTaskText = useCallback((id, newText) =>
    dispatch({ type: actionTypes.UPDATE_ONE_TEXT, payload: { id, text: newText } }), []);
  const cleanTasksByFilter = useCallback((filter) => {
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
  }, []);

  return (
    <Container maxW='container.sm' py={4}>
      <AddTaskControl onTaskDataCreate={createTask} />
      <Flex align="center" mt={6}>
        <Menu>
          <MenuButton _active={{ backgroundColor: "gray.700" }} variant="outline" borderRadius="100px" color="#EDF2F7" border="2px solid" borderColor="gray.700" as={Button} _hover={{ backgroundColor: "gray.700" }} rightIcon={<ChevronDownIcon />}>
            Remove
          </MenuButton>
          <MenuList backgroundColor="gray.700" border="none" >
            <MenuItem _hover={{ backgroundColor: "gray.600" }} backgroundColor="gray.700" onClick={() => cleanTasksByFilter(tasksFilters.ALL)}>All</MenuItem>
            <MenuItem _hover={{ backgroundColor: "gray.600" }} backgroundColor="gray.700" onClick={() => cleanTasksByFilter(tasksFilters.ACTIVE)}>Active</MenuItem>
            <MenuItem _hover={{ backgroundColor: "gray.600" }} backgroundColor="gray.700" onClick={() => cleanTasksByFilter(tasksFilters.COMPLETED)}>Completed</MenuItem>
          </MenuList>
        </Menu>
        <Spacer />
        <Text>Сompleteness:</Text>
        <CircularProgress value={completenessPercentage} ml={2} size='64px' color='green.400' trackColor="gray.600">
          <CircularProgressLabel>{completenessPercentage}%</CircularProgressLabel>
        </CircularProgress>
      </Flex>
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
    </Container>
  );
}

export default App;
