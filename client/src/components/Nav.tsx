import { Button } from "@chakra-ui/button";
import { Box, Container, Flex, HStack } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import Logo from "./Logo";
import Nextlink from "next/link";

interface Props {}

const Nav: FC<Props> = ({}) => {
  const router = useRouter();
  const { data, loading } = useMeQuery();
  const [logout, { loading: logoutLoading }] = useLogoutMutation();

  let body = null;

  if (loading) {
  } else if (!data?.me) {
    body = (
      <HStack>
        <Button letterSpacing="wider" colorScheme="green">
          <Nextlink href="/login">login</Nextlink>
        </Button>
        <Button letterSpacing="wider" colorScheme="purple">
          <Nextlink href="/register">register</Nextlink>
        </Button>
      </HStack>
    );
  } else {
    body = (
      <HStack>
        <Button letterSpacing="wider" colorScheme="green">
          {data?.me?.username}
        </Button>
        <Button
          letterSpacing="wider"
          isLoading={logoutLoading}
          colorScheme="red"
          onClick={async () => {
            await logout();
            router.reload();
          }}
        >
          Logout
        </Button>
      </HStack>
    );
  }
  return (
    <Box>
      <Container maxW="container.lg">
        <Flex py={2} justifyContent="space-between">
          <Logo />
          {body}
        </Flex>
      </Container>
    </Box>
  );
};

export default Nav;
