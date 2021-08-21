import { Button } from "@chakra-ui/button";
import { Box, Container, Flex, HStack } from "@chakra-ui/layout";
import React, { FC } from "react";
import Logo from "./Logo";

interface Props {}

const Nav: FC<Props> = ({}) => {
  return (
    <Box>
      <Container maxW="container.lg">
        <Flex py={2} justifyContent="space-between">
          <Logo />
          <HStack>
            <Button
              fontFamily="Nexa Bold"
              letterSpacing="wider"
              variant="solid"
              fontSize="18px"
              bg="brand.600"
              color="white"
            >
              login
            </Button>
            <Button
              fontFamily="Nexa Bold"
              letterSpacing="wider"
              variant="solid"
              fontSize="18px"
              bg="brandSecondary.400"
              color="white"
            >
              register
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Nav;
