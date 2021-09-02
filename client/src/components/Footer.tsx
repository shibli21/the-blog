import { Container } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { DividerWithText } from "./DividerWithText";

interface Props {}

const Footer: FC<Props> = ({}) => {
  return (
    <Container maxW="container.lg" p={20}>
      <DividerWithText>
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()} The Blog. All rights reserved.
        </Text>
      </DividerWithText>
    </Container>
  );
};

export default Footer;
