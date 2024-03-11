// chakra
import { Tabs, Tab, TabList } from "@chakra-ui/react";

export default function ChangeVisibleTasksTypeControl({ currentType, onChange }) {
  return (
    <div>
      <Tabs defaultIndex={currentType === "active" ? 1 : currentType === "completed" ? 2 : 0}>
        <TabList>
          <Tab onClick={() => onChange("all")}>All</Tab>
          <Tab onClick={() => onChange("active")}>Active</Tab>
          <Tab onClick={() => onChange("completed")}>Completed</Tab>
        </TabList>
      </Tabs>
    </div>
  );
}