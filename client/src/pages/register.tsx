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
import { Link } from "../components/Link";
import Logo from "../components/Logo";
import { MeDocument, useRegisterMutation } from "../generated/graphql";

interface Props {}

const Register = ({}: Props) => {
  const [registerUser] = useRegisterMutation();

  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const response = await registerUser({
      variables: {
        registerInput: {
          email: data.email,
          username: data.username,
          password: data.password,
        },
      },
      refetchQueries: [
        {
          query: MeDocument,
        },
      ],
    });

    if (response.data?.register.errors) {
      response.data?.register.errors.map(err => {
        setError(err.field, {
          type: "manual",
          message: err.message,
        });
      });
    } else if (response.data?.register.user) {
      router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>The Blog | Register</title>
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
            Sign up to your account
          </Heading>
          <HStack mt="4" mb="8" justifyContent="center" fontWeight="medium">
            <Text as="span">Already have an account?</Text>
            <NextLink href="/login">
              <Link href="#"> Sign in</Link>
            </NextLink>
          </HStack>
          <Card border="1px solid">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="6">
                <FormControl isInvalid={errors.username}>
                  <FormLabel htmlFor="username">Name</FormLabel>
                  <Input
                    borderRadius="0"
                    id="username"
                    placeholder="username"
                    {...register("username", {
                      required: "This is required",
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 4",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.username && errors.username.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    borderRadius="0"
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
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password}>
                  <FormLabel htmlFor="name">Password</FormLabel>
                  <Input
                    borderRadius="0"
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
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  fontSize="md"
                >
                  Sign up
                </Button>
              </Stack>
            </form>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default Register;
