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

  return <ListItem pl={isEditing ? 4 : 0} py={isEditing ? 4 : 0} display="flex" gap={2} pr={2} borderRadius="8px" alignItems="center" _hover={{ backgroundColor: "blackAlpha.300" }}>
    {isEditing ?
      <Input py={4} onChange={handleEditingInputChange} onKeyUp={handleKeyUpWhenEditing} value={newText} type="text" autoFocus /> :
      <Checkbox pl={4} py={4} onChange={onToggleCompleteness} isChecked={isCompleted} style={isCompleted ? { color: "#718096" } : {}} flex={1} variant="circular" colorScheme="green">
        <Text as={isCompleted ? "del" : ""}>{text}</Text>
      </Checkbox>}
    {isEditing ?
      <>
        <IconButton variant="ghost" _hover={{ backgroundColor: "gray.700" }} isRound={true} onClick={handleEditingConfirmation} icon={<CheckIcon color="gray.400" />} />
        <IconButton variant="ghost" _hover={{ backgroundColor: "gray.700" }} isRound={true} onClick={handleUndoBtnClick} icon={<CloseIcon color="gray.400" />} />
      </> :
      <>
        <IconButton variant="ghost" _hover={{ backgroundColor: "gray.700" }} isRound={true} onClick={handleEditBtnClick} icon={<EditIcon color="gray.400" />} />
        <IconButton variant="ghost" _hover={{ backgroundColor: "gray.700" }} isRound={true} onClick={onRemove} icon={<DeleteIcon color="gray.400" />} />
      </>}
  </ListItem>;
}