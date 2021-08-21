import { Container, Heading } from "@chakra-ui/layout";
import React, { FC } from "react";

interface Props {}

const Footer: FC<Props> = ({}) => {
  return (
    <Container maxW="container.lg">
      <Heading>Footer</Heading>
    </Container>
  );
};

export default Footer;
