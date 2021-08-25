import { Button, Stack } from "@chakra-ui/react";
import Layout from "../components/layout";
import PostCard from "../components/PostCard";
import { PostsDocument, usePostsQuery } from "../generated/graphql";

const Index = () => {
  const { data, fetchMore, loading } = usePostsQuery({
    variables: {
      postsInput: {
        offset: 0,
        limit: 2,
      },
    },
  });

  return (
    <Layout>
      <Stack spacing={4}>
        {data?.posts.map(p => (
          <PostCard
            identifier={p.identifier}
            slug={p.slug}
            key={p.identifier}
            body={p.body}
            title={p.title}
            username={p.user.username}
            createdAt={p.createdAt}
            userVote={p.userVote}
            votesCount={p.votesCount}
          />
        ))}
        <Button
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
          isLoading={loading}
        >
          Fetch More
        </Button>
      </Stack>
    </Layout>
  );
};

export default Index;
