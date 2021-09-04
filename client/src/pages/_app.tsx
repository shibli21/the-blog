import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { ChakraProvider } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { AppProps } from "next/app";
import Fonts from "../theme/Fonts";
import theme from "../theme/theme";

function MyApp({ Component, pageProps }: AppProps, ctx: NextPageContext) {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              ...offsetLimitPagination(),

              merge(existing = [], incoming: any[]) {
                return [...existing, ...incoming];
              },
            },
            userPosts: {
              ...offsetLimitPagination(),

              merge(existing = [], incoming: any[]) {
                return [...existing, ...incoming];
              },
            },
          },
        },
      },
    }),
  });

  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Fonts />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
