import { Button, Center, Flex, Spinner, Stack } from "@chakra-ui/react";
import Layout from "../components/layout";
import PostCard from "../components/PostCard";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const { data, fetchMore, loading, called } = usePostsQuery({
    variables: {
      postsInput: {
        offset: 0,
        limit: 2,
      },
    },
  });

  return (
    <Layout>
      {loading ? (
        <Center mt={10}>
          <Spinner size="xl" />
        </Center>
      ) : (
        <Stack spacing={4}>
          {data?.posts.map(p => (
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
                    postsInput: {
                      offset: data?.posts.length,
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

export default Index;
