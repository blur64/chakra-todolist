import { Input } from "@chakra-ui/react";
import { useState } from "react";

export default function AddTaskControl({ onTaskDataCreate }) {
  const [newTaskText, setNewTaskText] = useState("");

  function createTaskData() {
    if (!newTaskText) {
      return;
    }
    onTaskDataCreate(newTaskText);
    setNewTaskText("");
  }

  function handleKeyUp(key) {
    if (key === "Enter") {
      createTaskData();
    }
  }

  return <Input
    onChange={e => setNewTaskText(e.target.value)}
    onKeyUp={e => handleKeyUp(e.key)}
    value={newTaskText}
    type="text"
  />;
}