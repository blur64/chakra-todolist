// react
import { memo } from "react"
// chakra
import { Menu, MenuButton, MenuItem, MenuList, Button } from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"
// other
import { tasksFilters } from "../constants"

export default memo(function CleanTasksControl({ onCleanByFilter }) {
  return <Menu>
    <MenuButton rightIcon={<ChevronDownIcon />} as={Button} variant="outline">
      Clean
    </MenuButton>
    <MenuList >
      <MenuItem onClick={() => onCleanByFilter(tasksFilters.ALL)}>All</MenuItem>
      <MenuItem onClick={() => onCleanByFilter(tasksFilters.ACTIVE)}>Active</MenuItem>
      <MenuItem onClick={() => onCleanByFilter(tasksFilters.COMPLETED)}>Completed</MenuItem>
    </MenuList>
  </Menu>
});