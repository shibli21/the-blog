import { EmailIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Flex,
  HStack,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { DividerWithText } from "../../components/DividerWithText";
import Layout from "../../components/layout";
import PostCard from "../../components/PostCard";
import { useMeQuery, useUserPostsQuery } from "../../generated/graphql";
import withApollo from "../../lib/withApollo";

interface Props {}

const Profile = ({}: Props) => {
  const { data } = useMeQuery();
  const {
    data: userPosts,
    loading,
    fetchMore,
  } = useUserPostsQuery({
    variables: {
      userPostsInput: {
        offset: 0,
        limit: 2,
      },
    },
  });

  return (
    <Layout pageTitle={`The Blog | ${data?.me?.username}`}>
      <VStack alignItems="center" justifyContent="center">
        <Text
          fontSize="3xl"
          bgGradient="linear(to-l, #7928CA,#FF0080)"
          bgClip="text"
        >
          {data?.me?.username}
        </Text>
        <HStack>
          <EmailIcon />
          <Text>{data?.me?.email}</Text>
        </HStack>
      </VStack>
      <DividerWithText my={10}>
        <Text>My posts</Text>
      </DividerWithText>
      {loading ? (
        <Center mt={10}>
          <Spinner size="xl" />
        </Center>
      ) : (
        <Stack spacing={4}>
          {userPosts?.userPosts.map(p => (
            <PostCard
              identifier={p.identifier}
              slug={p.slug}
              key={p.identifier}
              body={p.body}
              title={p.title}
              userEmail={p.user.email}
              username={p.user.username}
              createdAt={p.createdAt}
              userVote={p.userVote}
              votesCount={p.votesCount}
              comments={p.comments}
            />
          ))}
          <Flex justifyContent="flex-end">
            <Button
              w="150px"
              variant="solid"
              colorScheme="brand"
              onClick={() =>
                fetchMore({
                  variables: {
                    userPostsInput: {
                      offset: userPosts?.userPosts.length,
                      limit: 2,
                    },
                  },
                })
              }
            >
              More post
            </Button>
          </Flex>
        </Stack>
      )}
    </Layout>
  );
};

export default withApollo(Profile);
