import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Fonts from "../theme/Fonts";
import theme from "../theme/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
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
