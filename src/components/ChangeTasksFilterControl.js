// react
import { memo } from "react";
// chakra
import { Tabs, Tab, TabList } from "@chakra-ui/react";

import { tasksFilters } from "../constants";

export default memo(function ChangeTasksFilterControl({ currentFilter, onChange }) {
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
});