import { Stack } from "@chakra-ui/react";
import Layout from "../components/layout";
import PostCard from "../components/PostCard";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const { data } = usePostsQuery();

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
      </Stack>
    </Layout>
  );
};

export default Index;
