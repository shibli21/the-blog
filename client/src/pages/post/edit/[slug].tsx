import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { Card } from "../../../components/Card";
import { DividerWithText } from "../../../components/DividerWithText";
import Layout from "../../../components/layout";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";

interface Props {}

const EditPost = ({}: Props) => {
  const router = useRouter();

  const slug = typeof router.query.slug === "string" ? router.query.slug : -1;

  const { data } = usePostQuery({
    variables: {
      getPostInput: {
        identifier: router.query.identifier as string,
        slug: slug as string,
      },
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [updatePost] = useUpdatePostMutation();

  const onSubmit = async (data: any) => {
    const response = await updatePost({
      variables: {
        updatePostInput: {
          body: data.body,
          title: data.title,
          identifier: router.query.identifier as string,
          slug: slug as string,
        },
      },
    });

    if (response.data?.updatePost) {
      router.back();
    } else {
      return;
    }
  };

  if (!data?.getPost.post) {
    return <Box>No Post</Box>;
  }

  return (
    <Layout>
      <Box bg={useColorModeValue("gray.50", "inherit")} minH="100vh" py="12">
        <Box>
          <DividerWithText my={10}>
            <Text fontSize="20px">Make change to your post</Text>
          </DividerWithText>

          <Card border="1px solid" p={5}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="6">
                <FormControl isInvalid={errors.title}>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <Input
                    borderRadius={0}
                    id="title"
                    defaultValue={data.getPost.post.title}
                    {...register("title", {
                      required: "Title is required",
                      minLength: {
                        value: 10,
                        message: "Minimum length should be 10",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.title && errors.title.message}
                  </FormErrorMessage>
                </FormControl>
                <VStack alignItems="self-start">
                  <Text>Body</Text>
                  <Textarea
                    borderRadius={0}
                    id="body"
                    isFullWidth={true}
                    defaultValue={data.getPost.post.body}
                    {...register("body")}
                  />
                </VStack>
              </Stack>
              <Flex justifyContent="flex-end" mt={4}>
                <Button type="submit" colorScheme="blue" fontSize="md">
                  save post
                </Button>
              </Flex>
            </form>
          </Card>
        </Box>
      </Box>
    </Layout>
  );
};

export default EditPost;
