import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  chakra,
  Flex,
  HStack,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/layout";
import {
  useDeletePostMutation,
  useMeQuery,
  usePostQuery,
} from "../../generated/graphql";
interface Props {}

const Post = (props: Props) => {
  const router = useRouter();
  console.log("🚀 ~ file: [slug].tsx ~ line 9 ~ Post ~ router", router);
  const { data: MeData, loading } = useMeQuery();

  const [deletePost] = useDeletePostMutation();

  const slug = typeof router.query.slug === "string" ? router.query.slug : -1;

  const { data } = usePostQuery({
    variables: {
      getPostInput: {
        identifier: router.query.identifier as string,
        slug: slug as string,
      },
    },
  });

  return (
    <Layout>
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
          >
            {data?.getPost.post?.createdAt &&
              DateTime.fromISO(
                new Date(parseInt(data?.getPost.post?.createdAt)).toISOString()
              ).toLocaleString(DateTime.DATETIME_MED)}
          </chakra.span>
          <HStack>
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
            {MeData?.me?.email === data?.getPost.post?.user.email && (
              <DeleteIcon
                _hover={{ color: "red.400" }}
                onClick={() => {
                  deletePost({
                    variables: {
                      deletePostIdentifier: data?.getPost.post?.identifier!,
                    },
                  });
                  router.push("/");
                }}
              />
            )}
          </HStack>
        </Flex>

        <Box mt={2}>
          <Text
            fontSize="2xl"
            color={useColorModeValue("gray.700", "white")}
            fontWeight="700"
            _hover={{
              color: useColorModeValue("gray.600", "gray.200"),
              textDecor: "underline",
            }}
          >
            {data?.getPost.post?.title}
          </Text>
          <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
            {data?.getPost.post?.body}
          </chakra.p>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <Flex alignItems="center">
            <Link
              color={useColorModeValue("gray.700", "gray.200")}
              fontWeight="700"
              cursor="pointer"
            >
              {data?.getPost.post?.user.username}
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
};

export default Post;
