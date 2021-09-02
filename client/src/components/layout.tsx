import { Container, Flex, FlexProps } from "@chakra-ui/react";
import Head from "next/head";
import React, { FC } from "react";
import Footer from "./Footer";
import Nav from "./Nav";

/**
 * Layout which surounds every component
 */
interface Props {
  pageTitle?: string;
}

const Layout: FC<Props> = ({ children, pageTitle, ...props }) => (
  <>
    {pageTitle && (
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    )}
    <Container maxW="800px" my={5}>
      <Flex direction="column" h="100vh" w="100%" {...(props as FlexProps)}>
        <Nav />
        <Flex direction="column" flex={1}>
          <Container maxW="container.lg" my={10}>
            <main>{children}</main>
          </Container>
        </Flex>
        <Footer />
      </Flex>
    </Container>
  </>
);

export default Layout;
