import { UnorderedList, ListItem, Button } from "@chakra-ui/react";

/*
{
  id: 0,
  text: "",
}
*/

export default function TasksList({ tasks, onRemoveOne }) {
  return <UnorderedList>
    {tasks.map(t => <Task
      onRemove={() => onRemoveOne(t.id)}
      text={t.text}
      key={t.id}
    />)}
  </UnorderedList>
}

function Task({ text, onRemove }) {
  return <ListItem>
    {text}
    <Button onClick={onRemove}>x</Button>
  </ListItem>;
}