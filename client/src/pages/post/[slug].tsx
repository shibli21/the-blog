import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import React from "react";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import Layout from "../../components/layout";
import VoteStatus from "../../components/VoteStatus";
import {
  GetCommentsDocument,
  useCommentOnPostMutationMutation,
  useDeleteCommentMutation,
  useDeletePostMutation,
  useGetCommentsQuery,
  useMeQuery,
  usePostQuery,
} from "../../generated/graphql";
interface Props {}

const Post = ({}: Props) => {
  const router = useRouter();
  const { data: MeData } = useMeQuery();

  const [deletePost] = useDeletePostMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [commentOnPost] = useCommentOnPostMutationMutation();

  const slug = typeof router.query.slug === "string" ? router.query.slug : -1;

  const { data } = usePostQuery({
    variables: {
      getPostInput: {
        identifier: router.query.identifier as string,
        slug: slug as string,
      },
    },
  });
  const { data: commentsData } = useGetCommentsQuery({
    variables: {
      getCommentsInput: {
        identifier: router.query.identifier as string,
        slug: slug as string,
      },
    },
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const toast = useToast();

  const onSubmit = async (data: any) => {
    if (MeData?.me?.email) {
      await commentOnPost({
        variables: {
          commentOnPostInput: {
            body: data.body,
            identifier: router.query.identifier as string,
            slug: slug as string,
          },
        },
        refetchQueries: [
          {
            query: GetCommentsDocument,
            variables: {
              getCommentsInput: {
                identifier: router.query.identifier as string,
                slug: slug as string,
              },
            },
          },
        ],
      });
      reset();
    } else {
      toast({
        title: "You can't comment on this post",
        description: "You need to sign in first",
        status: "error",
        duration: 9000,
        isClosable: true,
        variant: "left-accent",
        position: "bottom-right",
      });
      reset();
    }
  };
  if (!data?.getPost.post) {
    return <Box>No Post</Box>;
  }

  return (
    <Layout>
      <Box px={8} py={4} bg={useColorModeValue("white", "gray.800")}>
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
            <VoteStatus
              identifier={data.getPost.post.identifier}
              slug={data.getPost.post.slug}
              userVote={data.getPost.post.userVote}
              votesCount={data.getPost.post.votesCount}
            />
            {MeData?.me?.email === data?.getPost.post?.user.email && (
              <HStack cursor="pointer">
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
                <NextLink
                  href={`/post/edit/${slug}?identifier=${router.query.identifier}`}
                >
                  <EditIcon _hover={{ color: "blue.400" }} />
                </NextLink>
              </HStack>
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
      <Box>
        <Text px={6} py={3}>
          Comments
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.body}>
            <InputGroup size="md">
              <Input
                placeholder="comment"
                pr="4.5rem"
                id="body"
                {...register("body", {
                  required: "comment can not be empty",
                  minLength: {
                    value: 1,
                    message: "Minimum length should be 4",
                  },
                })}
              />
              <InputRightElement width="6.5rem">
                <Button h="1.75rem" size="sm" type="submit">
                  comment
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.body && errors.body.message}
            </FormErrorMessage>
          </FormControl>
        </form>
        {commentsData?.getComments.map(c => (
          <VStack
            alignItems="flex-start"
            py={4}
            px={6}
            my={4}
            bg={useColorModeValue("white", "gray.800")}
          >
            <Flex w="100%" justifyContent="space-between">
              <Box>{c.user.username}</Box>
              <HStack>
                <Box>
                  {c.createdAt &&
                    DateTime.fromISO(
                      new Date(parseInt(c.createdAt)).toISOString()
                    ).toLocaleString(DateTime.DATETIME_MED)}
                </Box>
                {MeData?.me?.email === c.user.email && (
                  <DeleteIcon
                    _hover={{ color: "red.400" }}
                    onClick={() => {
                      deleteComment({
                        variables: {
                          deleteCommentIdentifier: c.identifier,
                        },
                        refetchQueries: [
                          {
                            query: GetCommentsDocument,
                            variables: {
                              getCommentsInput: {
                                identifier: router.query.identifier as string,
                                slug: slug as string,
                              },
                            },
                          },
                        ],
                      });
                    }}
                  />
                )}
              </HStack>
            </Flex>
            <Box>{c.body}</Box>
          </VStack>
        ))}
      </Box>
    </Layout>
  );
};

export default Post;
