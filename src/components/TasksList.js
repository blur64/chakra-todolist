// react
import { useCallback, useState } from "react";
// chakra
import { UnorderedList, ListItem, Button, Checkbox, Input } from "@chakra-ui/react";

export default function TasksList({ tasks, onRemoveOne, onToggleOneCompleteness, onEditTextOne }) {
  return <UnorderedList>
    {tasks.map(t => <Task
      onRemove={() => onRemoveOne(t.id)}
      onToggleCompleteness={() => onToggleOneCompleteness(t.id)}
      onTextEdit={(newText) => onEditTextOne(t.id, newText)}
      isCompleted={t.isCompleted}
      text={t.text}
      key={t.id}
    />)}
  </UnorderedList>
}

function Task({ text, isCompleted, onRemove, onToggleCompleteness, onTextEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  function handleKeyUpWhenEditing({ key }) {
    if (key === "Enter" && newText) {
      handleEditingConfirmation();
    }
  }

  function handleEditingConfirmation() {
    onTextEdit(newText);
    setIsEditing(false);
  }

  const handleEditBtnClick = useCallback(() => setIsEditing(true), []);
  const handleEditingInputChange = useCallback(({ target: { value } }) =>
    setNewText(value), []);
  const handleUndoBtnClick = useCallback(() => {
    setIsEditing(false);
    setNewText(text);
  }, [text]);

  return <ListItem>
    {isEditing ?
      <Input onChange={handleEditingInputChange} onKeyUp={handleKeyUpWhenEditing} value={newText} type="text" autoFocus /> :
      <Checkbox onChange={onToggleCompleteness} isChecked={isCompleted} style={isCompleted ? { color: 'grey' } : {}}>
        {text}
      </Checkbox>}
    {isEditing ?
      <>
        <Button onClick={handleEditingConfirmation}>ok</Button>
        <Button onClick={handleUndoBtnClick}>undo</Button>
      </> :
      <>
        <Button onClick={handleEditBtnClick}>edit</Button>
        <Button onClick={onRemove}>x</Button>
      </>}
  </ListItem>;
}