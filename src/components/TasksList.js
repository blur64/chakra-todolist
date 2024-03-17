// react
import { useCallback, useState } from "react";
// chakra
import { UnorderedList, ListItem, Checkbox, Input, IconButton, Text } from "@chakra-ui/react";
import { EditIcon, CheckIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";

export default function TasksList({ tasks, onRemoveOne, onToggleOneCompleteness, onEditTextOne }) {
  return <UnorderedList mt={4} ml={0}>
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

  return <ListItem
    pl={isEditing ? 4 : 0} py={isEditing ? 4 : 0} pr={2} gap={2}
    display="flex" alignItems="center" borderRadius="8px"
    _hover={{ backgroundColor: "blackAlpha.300" }}
  >
    {isEditing ?
      <Input
        onChange={handleEditingInputChange}
        onKeyUp={handleKeyUpWhenEditing}
        value={newText}
        type="text"
        autoFocus
      /> :
      <Checkbox
        onChange={onToggleCompleteness}
        isChecked={isCompleted}
        pl={4} py={4} flex={1}
        variant="circular"
        colorScheme="green"
      >
        <Text
          as={isCompleted ? "del" : ""}
          color={isCompleted ? "gray.500" : ""}
        >
          {text}
        </Text>
      </Checkbox>}
    {isEditing ?
      <>
        <IconButton
          onClick={handleEditingConfirmation}
          icon={<CheckIcon variant="appBaseIcon" />}
          variant="ghost"
        />
        <IconButton
          onClick={handleUndoBtnClick}
          icon={<CloseIcon variant="appBaseIcon" />}
          variant="ghost"
        />
      </> :
      <>
        <IconButton
          onClick={handleEditBtnClick}
          icon={<EditIcon variant="appBaseIcon" />}
          variant="ghost"
        />
        <IconButton
          onClick={onRemove}
          icon={<DeleteIcon variant="appBaseIcon" />}
          variant="ghost"
        />
      </>}
  </ListItem>;
}