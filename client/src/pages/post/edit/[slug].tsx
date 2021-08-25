import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { Card } from "../../../components/Card";
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
      <Box
        bg={useColorModeValue("gray.50", "inherit")}
        minH="100vh"
        py="12"
        px={{ base: "4", lg: "8" }}
      >
        <Box maxW="md" mx="auto">
          <Heading textAlign="center" size="xl" fontWeight="extrabold" mb={10}>
            Create a post
          </Heading>

          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="6">
                <FormControl isInvalid={errors.title}>
                  <FormLabel htmlFor="title">post title</FormLabel>
                  <Input
                    id="title"
                    placeholder="title"
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
                <Box>
                  <Text>Post Body</Text>
                  <Textarea
                    placeholder="Here is a sample placeholder"
                    id="body"
                    defaultValue={data.getPost.post.body}
                    {...register("body")}
                  />
                </Box>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  fontSize="md"
                >
                  save post
                </Button>
              </Stack>
            </form>
          </Card>
        </Box>
      </Box>
    </Layout>
  );
};

export default EditPost;
