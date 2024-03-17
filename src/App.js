// react
import { useEffect, useReducer, useState, useCallback, useMemo } from "react";
// chakra
import { Container, Flex, Spacer } from "@chakra-ui/react";
// components
import AddTaskControl from "./components/AddTaskControl";
import TasksList from "./components/TasksList";
import ChangeTasksFilterControl from "./components/ChangeTasksFilterControl";
import CleanTasksControl from "./components/CleanTasksControl";
import ProgressPanel from "./components/ProgressPanel";
// other
import tasksReducer from "./tasks/reducer";
import { calcCompletenessPercentage } from "./tasks/relatedLogic";
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

  const completenessPercentage = useMemo(() =>
    calcCompletenessPercentage(tasks), [tasks]);

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
        <CleanTasksControl onCleanByFilter={cleanTasksByFilter} />
        <Spacer />
        <ProgressPanel completenessPercentage={completenessPercentage} />
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
