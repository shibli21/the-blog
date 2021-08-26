import { Button } from "@chakra-ui/button";
import { Box, Container, Flex, HStack } from "@chakra-ui/layout";
import Nextlink from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { DarkModeSwitch } from "./DarkModeSwitch";
import Logo from "./Logo";

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
        <Button letterSpacing="wider" colorScheme="purple">
          <Nextlink href="/create-post">create post</Nextlink>
        </Button>
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
          logout
        </Button>
      </HStack>
    );
  }
  return (
    <Box>
      <Container maxW="container.lg">
        <Flex py={2} justifyContent="space-between" flexWrap="wrap">
          <Logo />
          <DarkModeSwitch />
          {body}
        </Flex>
      </Container>
    </Box>
  );
};

export default Nav;
