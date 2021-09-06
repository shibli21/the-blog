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

  let body = (
    <HStack>
      <Button colorScheme="green">
        <Nextlink href="/login">log in</Nextlink>
      </Button>
      <Button colorScheme="purple">
        <Nextlink href="/register">sign up</Nextlink>
      </Button>
    </HStack>
  );

  if (loading) {
  } else if (!data?.me) {
    body = (
      <HStack>
        <Button colorScheme="green">
          <Nextlink href="/login">log in</Nextlink>
        </Button>
        <Button colorScheme="purple">
          <Nextlink href="/register">sign up</Nextlink>
        </Button>
      </HStack>
    );
  } else {
    body = (
      <HStack>
        <Button colorScheme="purple">
          <Nextlink href="/create-post">create new</Nextlink>
        </Button>

        <Button colorScheme="green">
          <Nextlink href={`/profile/${data.me.username}`}>
            {data?.me?.username}
          </Nextlink>
        </Button>
        <Button
          colorScheme="red"
          onClick={async () => {
            await logout();
            router.reload();
          }}
          isLoading={logoutLoading}
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
