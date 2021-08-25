import { Box, chakra, Flex, Link, useColorModeValue } from "@chakra-ui/react";
import { DateTime } from "luxon";
import NextLink from "next/link";
import React from "react";
import { Maybe } from "../generated/graphql";
import VoteStatus from "./VoteStatus";

interface Props {
  body: string;
  title: string;
  username: string;
  createdAt: string;
  slug: string;
  identifier: string;
  userVote?: Maybe<number> | undefined;
  votesCount: number;
}

const PostCard = ({
  body,
  createdAt,
  title,
  username,
  identifier,
  slug,
  userVote,
  votesCount,
}: Props) => {
  return (
    <Box
      px={8}
      py={4}
      rounded="lg"
      shadow="lg"
      bg={useColorModeValue("white", "gray.800")}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <chakra.span
          fontSize="sm"
          color={useColorModeValue("gray.600", "gray.400")}
          flex={1}
        >
          {DateTime.fromISO(
            new Date(parseInt(createdAt)).toISOString()
          ).toLocaleString(DateTime.DATETIME_MED)}
        </chakra.span>
        <VoteStatus
          identifier={identifier}
          slug={slug}
          userVote={userVote}
          votesCount={votesCount}
        />
      </Flex>

      <Box mt={2}>
        <NextLink href={`/post/${slug}?identifier=${identifier}`}>
          <Link
            fontSize="2xl"
            color={useColorModeValue("gray.700", "white")}
            fontWeight="700"
            _hover={{
              color: useColorModeValue("gray.600", "gray.200"),
              textDecor: "underline",
            }}
          >
            {title}
          </Link>
        </NextLink>
        <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
          {body.slice(0, 300)} ...
        </chakra.p>
      </Box>

      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        <Link
          color={useColorModeValue("brand.600", "brand.400")}
          _hover={{ textDecor: "underline" }}
        >
          Read more
        </Link>

        <Flex alignItems="center">
          {/* <Box
            mx={4}
            w={7}
            h={7}
            borderRadius="50%"
            background="red.400"
            textAlign="center"
          >
            K
          </Box> */}
          <Link
            color={useColorModeValue("gray.700", "gray.200")}
            fontWeight="700"
            cursor="pointer"
          >
            {username}
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default PostCard;
