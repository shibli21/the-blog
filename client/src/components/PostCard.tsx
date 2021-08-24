import {
  Box,
  chakra,
  Flex,
  Image,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { DateTime } from "luxon";

interface Props {
  body: string;
  title: string;
  username: string;
  createdAt: string;
  slug: string;
  identifier: string;
}

const PostCard = ({
  body,
  createdAt,
  title,
  username,
  identifier,
  slug,
}: Props) => {
  return (
    <Box
      px={8}
      py={4}
      rounded="lg"
      shadow="lg"
      bg={useColorModeValue("white", "gray.800")}
      //   maxW="2xl"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <chakra.span
          fontSize="sm"
          color={useColorModeValue("gray.600", "gray.400")}
        >
          {DateTime.fromISO(
            new Date(parseInt(createdAt)).toISOString()
          ).toLocaleString(DateTime.DATETIME_MED)}
        </chakra.span>
        <Link
          px={3}
          py={1}
          bg="gray.600"
          color="gray.100"
          fontSize="sm"
          fontWeight="700"
          rounded="md"
          _hover={{ bg: "gray.500" }}
        >
          Design
        </Link>
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
