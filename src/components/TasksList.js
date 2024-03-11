import { UnorderedList, ListItem, Button, Checkbox, Input } from "@chakra-ui/react";
import { useState } from "react";

/*
{
  id: 0,
  text: "",
  isCompleted: false,
}
*/

export default function TasksList({ tasks, onRemoveOne, onToggleOneCompleteness, onEditTextOne }) {
  return <UnorderedList>
    {tasks.map(t => <Task
      onRemove={() => onRemoveOne(t.id)}
      toggleCompleteness={() => onToggleOneCompleteness(t.id)}
      onTextEdit={(newText) => onEditTextOne(t.id, newText)}
      isCompleted={t.isCompleted}
      text={t.text}
      key={t.id}
    />)}
  </UnorderedList>
}

function Task({ text, isCompleted, onRemove, toggleCompleteness, onTextEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setnNewText] = useState(text);

  function handleKeyUpWhenEditing({ key }) {
    if (key === "Enter" && newText) {
      onTextEdit(newText);
      setIsEditing(false);
    }
  }

  function handleEditingInputChange({ target: { value } }) {
    setnNewText(value);
  }

  function handleTextEdit() {
    setIsEditing(true);
  }

  return <ListItem>
    {isEditing ?
      <Input onChange={handleEditingInputChange} onKeyUp={handleKeyUpWhenEditing} type="text" /> :
      <Checkbox onChange={toggleCompleteness} isChecked={isCompleted} style={isCompleted ? { color: 'grey' } : {}}>
        {text}
      </Checkbox>}
    <Button onClick={handleTextEdit}>edit</Button>
    <Button onClick={onRemove}>x</Button>
  </ListItem>;
}