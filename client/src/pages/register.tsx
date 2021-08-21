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
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { Card } from "../components/Card";
import { Link } from "../components/Link";
import Logo from "../components/Logo";
import {
  MeDocument,
  useLoginMutation,
  useRegisterMutation,
} from "../generated/graphql";

interface Props {}

const Register = (props: Props) => {
  const [registerUser, { loading }] = useRegisterMutation();

  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
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
    <Box
      bg={useColorModeValue("gray.50", "inherit")}
      minH="100vh"
      py="12"
      px={{ base: "4", lg: "8" }}
    >
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
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">Already have an account?</Text>
          <Link href="#"> Sign in</Link>
        </Text>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="6">
              <FormControl isInvalid={errors.username}>
                <FormLabel htmlFor="username">Name</FormLabel>
                <Input
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
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
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
              <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                Sign up
              </Button>
            </Stack>
          </form>
        </Card>
      </Box>
    </Box>
  );
};

export default Register;
