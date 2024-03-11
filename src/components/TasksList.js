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
  const [newText, setNewText] = useState(text);

  function handleKeyUpWhenEditing({ key }) {
    if (key === "Enter" && newText) {
      onTextEdit(newText);
      setIsEditing(false);
    }
  }

  function handleEditingInputChange({ target: { value } }) {
    setNewText(value);
  }

  function handleEditBtnClick() {
    setIsEditing(true);
  }

  function handleUndoBtnClick() {
    setIsEditing(false);
    setNewText(text);
  }

  return <ListItem>
    {isEditing ?
      <Input onChange={handleEditingInputChange} onKeyUp={handleKeyUpWhenEditing} value={newText} type="text" autoFocus /> :
      <Checkbox onChange={toggleCompleteness} isChecked={isCompleted} style={isCompleted ? { color: 'grey' } : {}}>
        {text}
      </Checkbox>}
    {isEditing ?
      <Button onClick={handleUndoBtnClick}>undo</Button> :
      <Button onClick={handleEditBtnClick}>edit</Button>}
    <Button onClick={onRemove}>x</Button>
  </ListItem>;
}