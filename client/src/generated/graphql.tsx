import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Float'];
  identifier: Scalars['String'];
  body: Scalars['String'];
  username: Scalars['String'];
  user: User;
  post: Post;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CommentOnPostInputType = {
  slug: Scalars['String'];
  identifier: Scalars['String'];
  body: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GetPostInputType = {
  slug: Scalars['String'];
  identifier: Scalars['String'];
};

export type GetPostResponse = {
  __typename?: 'GetPostResponse';
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
};

export type Mutation = {
  __typename?: 'Mutation';
  commentOnPost: Comment;
  deleteComment: Scalars['Boolean'];
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  voteOnPost: Scalars['Boolean'];
};


export type MutationCommentOnPostArgs = {
  input: CommentOnPostInputType;
};


export type MutationDeleteCommentArgs = {
  identifier: Scalars['String'];
};


export type MutationCreatePostArgs = {
  input: PostInputType;
};


export type MutationUpdatePostArgs = {
  input: PostEditInputType;
};


export type MutationDeletePostArgs = {
  identifier: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: UserInputType;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationVoteOnPostArgs = {
  input: VoteOnPostInputType;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  title: Scalars['String'];
  identifier: Scalars['String'];
  slug: Scalars['String'];
  body: Scalars['String'];
  user: User;
  comments: Array<Comment>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  votes: Array<Vote>;
  userVote?: Maybe<Scalars['Float']>;
  votesCount: Scalars['Float'];
};

export type PostEditInputType = {
  title: Scalars['String'];
  body: Scalars['String'];
  slug: Scalars['String'];
  identifier: Scalars['String'];
};

export type PostIdentifier = {
  slug: Scalars['String'];
  identifier: Scalars['String'];
};

export type PostInputType = {
  title: Scalars['String'];
  body: Scalars['String'];
};

export type PostsFilterType = {
  offset: Scalars['Float'];
  limit: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Comment>;
  getComments: Array<Comment>;
  posts: Array<Post>;
  getPost: GetPostResponse;
  me?: Maybe<User>;
};


export type QueryGetCommentsArgs = {
  input: PostIdentifier;
};


export type QueryPostsArgs = {
  input: PostsFilterType;
};


export type QueryGetPostArgs = {
  input: GetPostInputType;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  posts: Array<Post>;
};

export type UserInputType = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type Vote = {
  __typename?: 'Vote';
  id: Scalars['Float'];
  value: Scalars['Float'];
  username: Scalars['String'];
  user: User;
  post: Post;
};

export type VoteOnPostInputType = {
  slug: Scalars['String'];
  identifier: Scalars['String'];
};

export type CommentOnPostMutationMutationVariables = Exact<{
  commentOnPostInput: CommentOnPostInputType;
}>;


export type CommentOnPostMutationMutation = { __typename?: 'Mutation', commentOnPost: { __typename?: 'Comment', id: number, identifier: string, body: string, createdAt: string, updatedAt: string } };

export type CreatePostMutationVariables = Exact<{
  createPostInput: PostInputType;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, title: string, identifier: string, slug: string, body: string, createdAt: string, updatedAt: string, user: { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string } } };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string }> } };

export type RegisterMutationVariables = Exact<{
  registerInput: UserInputType;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, email: string, username: string, createdAt: string, updatedAt: string }> } };

export type DeleteCommentMutationVariables = Exact<{
  deleteCommentIdentifier: Scalars['String'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type DeletePostMutationVariables = Exact<{
  deletePostIdentifier: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UpdatePostMutationVariables = Exact<{
  updatePostInput: PostEditInputType;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: Maybe<{ __typename?: 'Post', title: string, identifier: string, slug: string, body: string }> };

export type VoteOnPostMutationVariables = Exact<{
  voteOnPostInput: VoteOnPostInputType;
}>;


export type VoteOnPostMutation = { __typename?: 'Mutation', voteOnPost: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string }> };

export type PostQueryVariables = Exact<{
  getPostInput: GetPostInputType;
}>;


export type PostQuery = { __typename?: 'Query', getPost: { __typename?: 'GetPostResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, post?: Maybe<{ __typename?: 'Post', title: string, id: number, identifier: string, slug: string, body: string, createdAt: string, updatedAt: string, userVote?: Maybe<number>, votesCount: number, user: { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string }, comments: Array<{ __typename?: 'Comment', id: number, identifier: string, body: string, username: string, createdAt: string, updatedAt: string, user: { __typename?: 'User', username: string } }>, votes: Array<{ __typename?: 'Vote', value: number, username: string }> }> } };

export type PostsQueryVariables = Exact<{
  postsInput: PostsFilterType;
}>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: number, title: string, identifier: string, slug: string, body: string, userVote?: Maybe<number>, votesCount: number, createdAt: string, updatedAt: string, user: { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string }, votes: Array<{ __typename?: 'Vote', value: number, username: string }>, comments: Array<{ __typename?: 'Comment', body: string }> }> };

export type GetCommentsQueryVariables = Exact<{
  getCommentsInput: PostIdentifier;
}>;


export type GetCommentsQuery = { __typename?: 'Query', getComments: Array<{ __typename?: 'Comment', id: number, identifier: string, body: string, username: string, createdAt: string, updatedAt: string, user: { __typename?: 'User', username: string, email: string } }> };


export const CommentOnPostMutationDocument = gql`
    mutation CommentOnPostMutation($commentOnPostInput: CommentOnPostInputType!) {
  commentOnPost(input: $commentOnPostInput) {
    id
    identifier
    body
    createdAt
    updatedAt
  }
}
    `;
export type CommentOnPostMutationMutationFn = Apollo.MutationFunction<CommentOnPostMutationMutation, CommentOnPostMutationMutationVariables>;

/**
 * __useCommentOnPostMutationMutation__
 *
 * To run a mutation, you first call `useCommentOnPostMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentOnPostMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentOnPostMutationMutation, { data, loading, error }] = useCommentOnPostMutationMutation({
 *   variables: {
 *      commentOnPostInput: // value for 'commentOnPostInput'
 *   },
 * });
 */
export function useCommentOnPostMutationMutation(baseOptions?: Apollo.MutationHookOptions<CommentOnPostMutationMutation, CommentOnPostMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentOnPostMutationMutation, CommentOnPostMutationMutationVariables>(CommentOnPostMutationDocument, options);
      }
export type CommentOnPostMutationMutationHookResult = ReturnType<typeof useCommentOnPostMutationMutation>;
export type CommentOnPostMutationMutationResult = Apollo.MutationResult<CommentOnPostMutationMutation>;
export type CommentOnPostMutationMutationOptions = Apollo.BaseMutationOptions<CommentOnPostMutationMutation, CommentOnPostMutationMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($createPostInput: PostInputType!) {
  createPost(input: $createPostInput) {
    id
    title
    identifier
    slug
    body
    user {
      id
      username
      email
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      createPostInput: // value for 'createPostInput'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const LoginDocument = gql`
    mutation Login($password: String!, $email: String!) {
  login(password: $password, email: $email) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: UserInputType!) {
  register(input: $registerInput) {
    errors {
      field
      message
    }
    user {
      id
      email
      username
      createdAt
      updatedAt
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($deleteCommentIdentifier: String!) {
  deleteComment(identifier: $deleteCommentIdentifier)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      deleteCommentIdentifier: // value for 'deleteCommentIdentifier'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeletePostDocument = gql`
    mutation deletePost($deletePostIdentifier: String!) {
  deletePost(identifier: $deletePostIdentifier)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      deletePostIdentifier: // value for 'deletePostIdentifier'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($updatePostInput: PostEditInputType!) {
  updatePost(input: $updatePostInput) {
    title
    identifier
    slug
    body
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      updatePostInput: // value for 'updatePostInput'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const VoteOnPostDocument = gql`
    mutation VoteOnPost($voteOnPostInput: VoteOnPostInputType!) {
  voteOnPost(input: $voteOnPostInput)
}
    `;
export type VoteOnPostMutationFn = Apollo.MutationFunction<VoteOnPostMutation, VoteOnPostMutationVariables>;

/**
 * __useVoteOnPostMutation__
 *
 * To run a mutation, you first call `useVoteOnPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteOnPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteOnPostMutation, { data, loading, error }] = useVoteOnPostMutation({
 *   variables: {
 *      voteOnPostInput: // value for 'voteOnPostInput'
 *   },
 * });
 */
export function useVoteOnPostMutation(baseOptions?: Apollo.MutationHookOptions<VoteOnPostMutation, VoteOnPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteOnPostMutation, VoteOnPostMutationVariables>(VoteOnPostDocument, options);
      }
export type VoteOnPostMutationHookResult = ReturnType<typeof useVoteOnPostMutation>;
export type VoteOnPostMutationResult = Apollo.MutationResult<VoteOnPostMutation>;
export type VoteOnPostMutationOptions = Apollo.BaseMutationOptions<VoteOnPostMutation, VoteOnPostMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PostDocument = gql`
    query post($getPostInput: GetPostInputType!) {
  getPost(input: $getPostInput) {
    errors {
      field
      message
    }
    post {
      title
      id
      identifier
      slug
      body
      user {
        id
        username
        email
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      comments {
        id
        identifier
        body
        username
        user {
          username
        }
        createdAt
        updatedAt
      }
      votes {
        value
        username
      }
      userVote
      votesCount
    }
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      getPostInput: // value for 'getPostInput'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts($postsInput: PostsFilterType!) {
  posts(input: $postsInput) {
    id
    title
    identifier
    slug
    body
    user {
      id
      username
      email
      createdAt
      updatedAt
    }
    votes {
      value
      username
    }
    userVote
    votesCount
    createdAt
    updatedAt
    comments {
      body
    }
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      postsInput: // value for 'postsInput'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const GetCommentsDocument = gql`
    query GetComments($getCommentsInput: PostIdentifier!) {
  getComments(input: $getCommentsInput) {
    id
    identifier
    body
    username
    user {
      username
      email
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a React component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsQuery({
 *   variables: {
 *      getCommentsInput: // value for 'getCommentsInput'
 *   },
 * });
 */
export function useGetCommentsQuery(baseOptions: Apollo.QueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
      }
export function useGetCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
        }
export type GetCommentsQueryHookResult = ReturnType<typeof useGetCommentsQuery>;
export type GetCommentsLazyQueryHookResult = ReturnType<typeof useGetCommentsLazyQuery>;
export type GetCommentsQueryResult = Apollo.QueryResult<GetCommentsQuery, GetCommentsQueryVariables>;