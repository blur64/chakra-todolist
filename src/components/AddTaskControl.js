// react
import { useCallback, useState, memo } from "react";
// chakra
import { Input } from "@chakra-ui/react";

export default memo(function AddTaskControl({ onTaskDataCreate }) {
  const [newTaskText, setNewTaskText] = useState("");

  function createTaskData() {
    if (!newTaskText) {
      return;
    }
    onTaskDataCreate(newTaskText);
    setNewTaskText("");
  }

  // There is similar logic in Task component in TaskList.js, maybe put it in
  // separate component? 
  function handleKeyUp({ key }) {
    if (key === "Enter" && newTaskText) {
      createTaskData();
    }
  }

  const handleInputChange = useCallback(({ target: { value } }) =>
    setNewTaskText(value), []);

  return <Input
    onChange={handleInputChange}
    onKeyUp={handleKeyUp}
    value={newTaskText}
    type="text"
  />;
});