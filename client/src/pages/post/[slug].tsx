import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  InputGroup,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { DividerWithText } from "../../components/DividerWithText";
import EditDeleteButtons from "../../components/EditDeleteButtons";
import Layout from "../../components/layout";
import VoteStatus from "../../components/VoteStatus";
import {
  GetCommentsDocument,
  useCommentOnPostMutationMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
  useMeQuery,
  usePostQuery,
} from "../../generated/graphql";
interface Props {}

const Post = ({}: Props) => {
  const router = useRouter();
  const { data: MeData } = useMeQuery();

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
      <Box border="1px solid" p={5} bg={useColorModeValue("white", "gray.800")}>
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
                {data?.getPost.post?.user.username}
              </Text>
              <chakra.span fontSize="sm" flex={1}>
                {data?.getPost.post?.createdAt &&
                  DateTime.fromISO(
                    new Date(
                      parseInt(data?.getPost.post?.createdAt)
                    ).toISOString()
                  ).toLocaleString(DateTime.DATETIME_MED)}
              </chakra.span>
            </Box>
          </HStack>

          <HStack>
            <VoteStatus
              identifier={data.getPost.post.identifier}
              slug={data.getPost.post.slug}
              userVote={data.getPost.post.userVote}
              votesCount={data.getPost.post.votesCount}
            />
            <EditDeleteButtons
              identifier={data.getPost.post.identifier}
              slug={data.getPost.post.slug}
              userEmail={data.getPost.post.user.email}
            />
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
          <chakra.p
            mt={2}
            color={useColorModeValue("gray.600", "gray.300")}
            textAlign="justify"
          >
            {data?.getPost.post?.body}
          </chakra.p>
        </Box>
      </Box>
      <DividerWithText>
        <Text px={5} py={3}>
          comments
        </Text>
      </DividerWithText>
      <Box p={5} border="1px solid">
        <chakra.form onSubmit={handleSubmit(onSubmit)} mb={4}>
          <HStack alignItems="flex-start">
            <FormControl isInvalid={errors.body}>
              <InputGroup size="md">
                <Input
                  borderRadius="0"
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
              </InputGroup>
              <FormErrorMessage>
                {errors.body && errors.body.message}
              </FormErrorMessage>
            </FormControl>
            <Button type="submit" variant="solid" colorScheme="green">
              comment
            </Button>
          </HStack>
        </chakra.form>
        {commentsData?.getComments.map(c => (
          <VStack alignItems="flex-start" py={2}>
            <Divider mb={2} />
            <Flex w="100%" justifyContent="space-between">
              <Box bgGradient="linear(to-l, #7928CA,#FF0080)" bgClip="text">
                {c.user.username}
              </Box>
              <HStack alignItems="flex-start">
                {MeData?.me?.email === c.user.email && (
                  <DeleteIcon
                    cursor="pointer"
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
                <Box>
                  {c.createdAt &&
                    DateTime.fromISO(
                      new Date(parseInt(c.createdAt)).toISOString()
                    ).toLocaleString(DateTime.TIME_SIMPLE)}
                </Box>
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
