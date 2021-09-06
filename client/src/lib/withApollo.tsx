import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import withApollo from "next-with-apollo";

export default withApollo(
  ({ initialState, ctx }) => {
    return new ApolloClient({
      uri: process.env.NEXT_PUBLIC_API_URL,
      credentials: "include",
      ssrMode: typeof window === "undefined",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Cookie:
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
