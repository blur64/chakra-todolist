import { UnorderedList, ListItem, Button, Checkbox } from "@chakra-ui/react";

/*
{
  id: 0,
  text: "",
}
*/

export default function TasksList({ tasks, onRemoveOne, onToggleOneCompleteness }) {
  return <UnorderedList>
    {tasks.map(t => <Task
      onRemove={() => onRemoveOne(t.id)}
      toggleCompleteness={() => onToggleOneCompleteness(t.id)}
      isCompleted={t.isCompleted}
      text={t.text}
      key={t.id}
    />)}
  </UnorderedList>
}

function Task({ text, isCompleted, onRemove, toggleCompleteness }) {
  return <ListItem>
    <Checkbox onChange={toggleCompleteness} isChecked={isCompleted} style={isCompleted ? { color: 'grey' } : {}}>
      {text}
    </Checkbox>
    <Button onClick={onRemove}>x</Button>
  </ListItem>;
}