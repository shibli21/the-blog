import { Button } from "@chakra-ui/button";
import { Box, Container, Flex } from "@chakra-ui/layout";
import React, { FC } from "react";
import Logo from "./Logo";

interface Props {}

const Nav: FC<Props> = ({}) => {
  return (
    <Container maxW="container.lg">
      <Flex py={4} justifyContent="space-between">
        <Logo />
        <Box>
          <Button variant="solid" colorScheme="purple">
            Login
          </Button>
        </Box>
      </Flex>
    </Container>
  );
};

export default Nav;
