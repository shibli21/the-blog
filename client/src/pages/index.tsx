import { Stack } from "@chakra-ui/react";
import Link from "next/link";
import Layout from "../components/layout";
import PostCard from "../components/PostCard";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const { data, loading } = usePostsQuery();

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
          />
        ))}
      </Stack>
    </Layout>
  );
};

export default Index;
