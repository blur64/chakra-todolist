// react
import { useCallback, useState, memo } from "react";
// chakra
import { Input, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default memo(function AddTaskControl({ onTaskDataCreate }) {
  const [newTaskText, setNewTaskText] = useState("");

  function createTaskData() {
    if (!newTaskText) {
      return;
    }
    onTaskDataCreate(newTaskText);
    setNewTaskText("");
  }

  function handleKeyUp({ key }) {
    if (key === "Enter" && newTaskText) {
      createTaskData();
    }
  }

  const handleInputChange = useCallback(({ target: { value } }) =>
    setNewTaskText(value), []);

  return <InputGroup>
    <Input
      onChange={handleInputChange}
      onKeyUp={handleKeyUp}
      value={newTaskText}
      type="text"
      placeholder="To do..."
    />
    <InputRightElement>
      <IconButton
        icon={<AddIcon variant="appBaseIcon" />}
        _hover={{ backgroundColor: "gray.600" }}
        variant="ghost"
      />
    </InputRightElement>
  </InputGroup>;
});