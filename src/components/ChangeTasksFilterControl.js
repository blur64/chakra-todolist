// chakra
import { Tabs, Tab, TabList } from "@chakra-ui/react";

import { tasksFilters } from "../App";

export default function ChangeTasksFilterControl({ currentFilter, onChange }) {
  return (
    <div>
      <Tabs defaultIndex={currentFilter}>
        <TabList>
          <Tab onClick={() => onChange(tasksFilters.ALL)}>All</Tab>
          <Tab onClick={() => onChange(tasksFilters.ACTIVE)}>Active</Tab>
          <Tab onClick={() => onChange(tasksFilters.COMPLETED)}>Completed</Tab>
        </TabList>
      </Tabs>
    </div>
  );
}