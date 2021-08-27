import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  chakra,
  Flex,
  HStack,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import NextLink from "next/link";
import React from "react";
import { Maybe } from "../generated/graphql";
import { BiCommentDetail } from "react-icons/bi";
import VoteStatus from "./VoteStatus";
import EditDeleteButtons from "./EditDeleteButtons";

interface Props {
  body: string;
  title: string;
  username: string;
  createdAt: string;
  userEmail: string;
  slug: string;
  identifier: string;
  userVote?: Maybe<number> | undefined;
  votesCount: number;
  comments: {
    body: string;
  }[];
}

const PostCard = ({
  body,
  createdAt,
  title,
  username,
  userEmail,
  identifier,
  slug,
  userVote,
  votesCount,
  comments,
}: Props) => {
  return (
    <Box border="1px solid" p={5} bg={useColorModeValue("white", "brand.900")}>
      <Flex justifyContent="space-between" alignItems="flex-start">
        <HStack alignItems="center">
          <Box
            bgGradient="linear(to-l, #7928CA,#FF0080)"
            w="40px"
            h="40px"
            borderRadius="50%"
          />
          <Box>
            <Text bgGradient="linear(to-l, #7928CA,#FF0080)" bgClip="text">
              {username}
            </Text>
            <chakra.span fontSize="sm" flex={1}>
              {DateTime.fromISO(
                new Date(parseInt(createdAt)).toISOString()
              ).toLocaleString(DateTime.DATE_FULL)}
            </chakra.span>
          </Box>
        </HStack>
        <HStack>
          <BiCommentDetail />
          <Text>{comments.length}</Text>
          <VoteStatus
            identifier={identifier}
            slug={slug}
            userVote={userVote}
            votesCount={votesCount}
          />
        </HStack>
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
        <NextLink href={`/post/${slug}?identifier=${identifier}`}>
          <HStack cursor="pointer">
            <Link
              _hover={{
                bgGradient: "linear(to-l, #7928CA,#FF0080)",
                bgClip: "text",
              }}
              textDecor="none"
            >
              continue reading
            </Link>

            <ArrowForwardIcon />
          </HStack>
        </NextLink>
        <EditDeleteButtons
          identifier={identifier}
          slug={slug}
          userEmail={userEmail}
        />
      </Flex>
    </Box>
  );
};

export default PostCard;
