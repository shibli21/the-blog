import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import {
  Maybe,
  PostDocument,
  PostsDocument,
  useMeQuery,
  useVoteOnPostMutation,
} from "../generated/graphql";
import { useToast } from "@chakra-ui/react";

interface Props {
  slug: string;
  identifier: string;
  userVote?: Maybe<number> | undefined;
  votesCount: number;
}

const VoteStatus = ({ identifier, slug, userVote, votesCount }: Props) => {
  const [voteOnPost] = useVoteOnPostMutation();
  const { data } = useMeQuery();
  const toast = useToast();

  let heart;

  if (userVote === 1) {
    heart = <AiFillHeart color="red" size="20px" />;
  } else {
    heart = <AiFillHeart size="20px" />;
  }

  return (
    <HStack>
      <Box
        cursor="pointer"
        onClick={() => {
          if (data?.me?.email) {
            voteOnPost({
              variables: {
                voteOnPostInput: {
                  identifier,
                  slug,
                },
              },
              refetchQueries: [
                {
                  query: PostDocument,
                  variables: {
                    getPostInput: {
                      identifier,
                      slug,
                    },
                  },
                },
              ],
            });
          } else {
            toast({
              title: "You can't like this post",
              description: "You need to sign in first",
              status: "error",
              duration: 9000,
              isClosable: true,
              variant: "left-accent",
              position: "bottom-right",
            });
          }
        }}
      >
        {heart}
      </Box>
      <Text>{votesCount === 0 ? "" : votesCount}</Text>
    </HStack>
  );
};

export default VoteStatus;
