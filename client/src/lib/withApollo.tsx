import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import fetch from "isomorphic-unfetch";
import withApollo from "next-with-apollo";

export default withApollo(
  ({ initialState, ctx }) => {
    return new ApolloClient({
      ssrMode: Boolean(ctx),
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_API_URL,
        credentials: "include",
        fetch: ctx
          ? (url, init) =>
              fetch(url, {
                ...init,
                headers: {
                  ...init?.headers,
                  Cookie:
                    (typeof window === "undefined"
                      ? ctx?.req?.headers.cookie
                      : undefined) || "",
                },
              }).then(response => response)
          : fetch,
      }),
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
      }).restore(initialState || {}),
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
