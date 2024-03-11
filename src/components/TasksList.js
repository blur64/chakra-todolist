import { UnorderedList, ListItem } from "@chakra-ui/react";

/*
{
  id: 0,
  text: "",
}
*/

export default function TasksList({ tasks }) {
  return <UnorderedList>
    {tasks.map(t => <Task id={t.id} text={t.text} key={t.id} />)}
  </UnorderedList>
}

function Task({ id, text }) {
  return <ListItem>{text}</ListItem>;
}