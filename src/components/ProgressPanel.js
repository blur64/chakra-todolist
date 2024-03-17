// react
import { memo } from "react";
// chakra
import { Flex, Text, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

export default memo(function ProgressPanel({ completenessPercentage }) {
  return <Flex align="center">
    <Text>Сompleteness:</Text>
    <CircularProgress
      value={completenessPercentage}
      color="green.400" trackColor="gray.600"
      ml={2} size="64px"
    >
      <CircularProgressLabel>{completenessPercentage}%</CircularProgressLabel>
    </CircularProgress>
  </Flex>;
});