import { Container, Flex, FlexProps } from "@chakra-ui/react";
import React, { FC } from "react";
import Footer from "./Footer";
import Nav from "./Nav";

/**
 * Layout which surounds every component
 */
interface Props {}

const Layout: FC<Props> = ({ children, ...props }) => (
  <Flex direction="column" h="100vh" w="100%" {...(props as FlexProps)}>
    <Nav />
    <Flex direction="column" flex={1}>
      <Container maxW="container.lg" my={10}>
        <main>{children}</main>
      </Container>
    </Flex>
    <Footer />
  </Flex>
);

export default Layout;
