import { Box, BoxProps } from "@chakra-ui/react";

export const FormLayout = (props: BoxProps) => (
  <Box
    w="400px"
    bg="gray.50"
    mt={10}
    p={10}
    pos="relative"
    _after={{
      pos: "absolute",
      content: `""`,
      h: "10px",
      w: "100%",
      bg: "purple.300",
      top: 0,
      left: 0,
    }}
    {...props}
  />
);
