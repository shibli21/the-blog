import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { Card } from "../components/Card";
import Logo from "../components/Logo";
import { MeDocument, useLoginMutation } from "../generated/graphql";
import withApollo from "../lib/withApollo";

interface Props {}

const Login = ({}: Props) => {
  const [login] = useLoginMutation();

  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    const response = await login({
      variables: {
        email: data.email,
        password: data.password,
      },
      refetchQueries: [
        {
          query: MeDocument,
        },
      ],
    });

    if (response.data?.login.errors) {
      response.data?.login.errors.map(err => {
        setError(err.field, {
          type: "manual",
          message: err.message,
        });
      });
    } else if (response.data?.login.user) {
      router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>The Blog | Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box minH="100vh" py="12" px={{ base: "4", lg: "8" }}>
        <Box maxW="md" mx="auto">
          <Logo
            textAlign="center"
            fontSize="60px"
            h="8"
            mb={{ base: "20", md: "20" }}
          />
          <Heading textAlign="center" size="xl" fontWeight="extrabold">
            Sign in to your account
          </Heading>
          <HStack mt="4" mb="8" justifyContent="center" fontWeight="medium">
            <Text as="span">Don&apos;t have an account?</Text>
            <NextLink href="/register">
              <Text cursor="pointer" color="blue.500">
                Create an account
              </Text>
            </NextLink>
          </HStack>
          <Card border="1px solid">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="6">
                <FormControl isInvalid={errors.name}>
                  <FormLabel htmlFor="name">Email </FormLabel>
                  <Input
                    borderRadius={0}
                    id="email"
                    placeholder="email"
                    {...register("email", {
                      required: "This is required",
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 4",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.name}>
                  <FormLabel htmlFor="name">Password</FormLabel>
                  <Input
                    borderRadius={0}
                    id="password"
                    type="password"
                    placeholder="password"
                    {...register("password", {
                      required: "This is required",
                      minLength: {
                        value: 6,
                        message: "Minimum length should be 6",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  fontSize="md"
                  isLoading={isSubmitting}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default withApollo(Login);
