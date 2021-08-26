import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
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
import { Card } from "../components/Card";
import { DividerWithText } from "../components/DividerWithText";
import Layout from "../components/layout";
import { useCreatePostMutation } from "../generated/graphql";

interface Props {}

const CreatePost = (props: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const [createPost, { loading }] = useCreatePostMutation();

  const onSubmit = async (data: any) => {
    const response = await createPost({
      variables: {
        createPostInput: {
          body: data.body,
          title: data.title,
        },
      },
    });

    if (response.data?.createPost) {
      router.push("/");
    } else {
    }
  };

  return (
    <Layout>
      <Box
        bg={useColorModeValue("gray.50", "inherit")}
        minH="100vh"
        py="12"
        px={{ base: "4", lg: "8" }}
      >
        <Box>
          <DividerWithText my={10}>
            <Text fontSize="20px">Write a new post</Text>
          </DividerWithText>

          <Card border="1px solid" p={5}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="6">
                <FormControl isInvalid={errors.title}>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <Input
                    borderRadius={0}
                    id="title"
                    placeholder="Your post title"
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
                    placeholder="Your post content ..."
                    id="body"
                    {...register("body")}
                  />
                </VStack>
                <Flex justifyContent="flex-end" mt={4}>
                  <Button type="submit" colorScheme="blue" fontSize="md">
                    create post
                  </Button>
                </Flex>
              </Stack>
            </form>
          </Card>
        </Box>
      </Box>
    </Layout>
  );
};

export default CreatePost;
